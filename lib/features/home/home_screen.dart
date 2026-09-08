import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/modern_cards.dart';
import '../../shared/widgets/animated_widgets.dart';

/// Home Dashboard Screen - VIBRANT ANIMATED Design
class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with TickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();
  late AnimationController _headerController;
  late AnimationController _pulseController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  bool _showCelebration = false;

  @override
  void initState() {
    super.initState();
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    )..repeat(reverse: true);

    _fadeAnimation = CurvedAnimation(
      parent: _headerController,
      curve: Curves.easeOut,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _headerController, curve: Curves.easeOutCubic));

    _headerController.forward();
  }

  @override
  void dispose() {
    _headerController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final progress = _progressRepo.getProgress();
    final subjects = _subjectRepo.getAllSubjects();

    // Calculate overall progress
    final totalTopics = subjects.fold<int>(0, (sum, s) => sum + s.totalTopics);
    final completedTopics =
        subjects.fold<int>(0, (sum, s) => sum + s.completedTopics);
    final overallProgress =
        totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0.0;

    return CelebrationEffect(
      isActive: _showCelebration,
      child: Scaffold(
        backgroundColor: AppColors.backgroundLight,
        body: SafeArea(
          child: CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Animated Header
              SliverToBoxAdapter(
                child: FadeTransition(
                  opacity: _fadeAnimation,
                  child: SlideTransition(
                    position: _slideAnimation,
                    child: _buildHeader(progress),
                  ),
                ),
              ),

              // Streak Card with Pulse Animation
              SliverToBoxAdapter(
                child: StaggeredAnimation(
                  index: 1,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppTheme.screenPadding),
                    child: _buildStreakCard(progress),
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 20)),

              // Overall Progress with Glow
              SliverToBoxAdapter(
                child: StaggeredAnimation(
                  index: 2,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppTheme.screenPadding),
                    child: _buildOverallProgress(
                        overallProgress, completedTopics, totalTopics),
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 24)),

              // Quick Stats with Bounce
              SliverToBoxAdapter(
                child: StaggeredAnimation(
                  index: 3,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppTheme.screenPadding),
                    child: _buildQuickStats(progress),
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 28)),

              // Subjects Section Title
              SliverToBoxAdapter(
                child: StaggeredAnimation(
                  index: 4,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: AppTheme.screenPadding),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            PulsingWidget(
                              child: ShaderMask(
                                shaderCallback: (bounds) =>
                                    AppColors.mainGradient.createShader(bounds),
                                child: Text(
                                  '✨ Your Subjects',
                                  style: AppTypography.headlineSmall.copyWith(
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        BounceButton(
                          onTap: () => context.go('/learn'),
                          child: ShaderMask(
                            shaderCallback: (bounds) =>
                                AppColors.mainGradient.createShader(bounds),
                            child: Text(
                              'See all →',
                              style: AppTypography.labelMedium.copyWith(
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // Subject cards with beautiful animated design
              SliverPadding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding,
                ),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final subject = subjects[index];
                      return StaggeredAnimation(
                        index: 5 + index,
                        child: Padding(
                          padding:
                              const EdgeInsets.only(bottom: AppTheme.spacing16),
                          child: _AnimatedSubjectCard(
                            icon: subject.icon,
                            title: subject.name,
                            subtitle: subject.subtitle,
                            progress: subject.progressPercentage,
                            completedTopics: subject.completedTopics,
                            totalTopics: subject.totalTopics,
                            gradient: AppColors.getSubjectGradient(subject.id),
                            onTap: () {
                              HapticFeedback.mediumImpact();
                              context.push('/learn/${subject.id}');
                            },
                          ),
                        ),
                      );
                    },
                    childCount: subjects.length.clamp(0, 3),
                  ),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 100)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(progress) {
    final hour = DateTime.now().hour;
    String greeting;
    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return Container(
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.accentPurple.withValues(alpha: 0.1),
            AppColors.accentPink.withValues(alpha: 0.08),
            AppColors.accentCyan.withValues(alpha: 0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '$greeting 👋',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    ShaderMask(
                      shaderCallback: (bounds) =>
                          AppColors.neonGlowGradient.createShader(bounds),
                      child: Text(
                        progress.userName,
                        style: AppTypography.headlineLarge.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // Animated gradient circle with pulse
              AnimatedBuilder(
                animation: _pulseController,
                builder: (context, child) {
                  return Transform.scale(
                    scale: 1 + (_pulseController.value * 0.05),
                    child: Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        gradient: AppColors.neonGlowGradient,
                        shape: BoxShape.circle,
                        boxShadow: AppColors.getNeonGlow(
                          AppColors.accentPurple,
                          blur: 25,
                          intensity: 0.4,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          progress.userName.isNotEmpty
                              ? progress.userName[0].toUpperCase()
                              : '?',
                          style: AppTypography.statsMedium.copyWith(
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStreakCard(progress) {
    final hasStreak = progress.streak > 0;
    return BounceButton(
      onTap: () {
        HapticFeedback.lightImpact();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          gradient: hasStreak
              ? const LinearGradient(
                  colors: [Color(0xFFFF6B35), Color(0xFFFF0080)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                )
              : null,
          color: hasStreak ? null : AppColors.cardLight,
          borderRadius: BorderRadius.circular(20),
          boxShadow: hasStreak
              ? AppColors.getNeonGlow(AppColors.accentOrange, blur: 25, intensity: 0.5)
              : AppColors.getSoftShadow(),
        ),
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            // Fire icon with animation
            AnimatedBuilder(
              animation: _pulseController,
              builder: (context, child) {
                return Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: hasStreak
                        ? Colors.white.withValues(alpha: 0.2)
                        : AppColors.cardElevated,
                    shape: BoxShape.circle,
                    boxShadow: hasStreak
                        ? [
                            BoxShadow(
                              color: AppColors.accentOrange.withValues(alpha: 0.5),
                              blurRadius: 15 + (_pulseController.value * 5),
                            ),
                          ]
                        : null,
                  ),
                  child: Center(
                    child: Text(
                      '🔥',
                      style: TextStyle(
                        fontSize: 28,
                        color: hasStreak ? null : Colors.grey,
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        '${progress.streak}',
                        style: AppTypography.statsSmall.copyWith(
                          color: hasStreak
                              ? Colors.white
                              : AppColors.textSecondary,
                          fontWeight: FontWeight.w800,
                          fontSize: 24,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'day streak',
                        style: AppTypography.bodyMedium.copyWith(
                          color: hasStreak
                              ? Colors.white.withValues(alpha: 0.9)
                              : AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    hasStreak ? "Keep it up! 💪" : 'Start your learning today',
                    style: AppTypography.bodySmall.copyWith(
                      color: hasStreak
                          ? Colors.white.withValues(alpha: 0.8)
                          : AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            // Decorative element
            if (hasStreak)
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.2),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.local_fire_department,
                  color: Colors.white,
                  size: 24,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildOverallProgress(
      double progress, int completed, int total) {
    return NeonGlowContainer(
      glowColor: AppColors.accentPurple,
      blurRadius: 20,
      border: Border.all(color: AppColors.accentPurple.withValues(alpha: 0.2)),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.cardLight,
          borderRadius: BorderRadius.circular(20),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    PulsingWidget(
                      child: Icon(
                        Icons.trending_up_rounded,
                        color: AppColors.accentPurple,
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Overall Progress',
                      style: AppTypography.titleMedium,
                    ),
                  ],
                ),
                ShaderMask(
                  shaderCallback: (bounds) =>
                      AppColors.mainGradient.createShader(bounds),
                  child: Text(
                    '${progress.toStringAsFixed(0)}%',
                    style: AppTypography.statsSmall.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                      fontSize: 20,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            AnimatedProgressBar(
              progress: progress,
              gradient: AppColors.mainGradient,
              height: 12,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _buildProgressChip('$completed', 'done', AppColors.accentEmerald),
                const SizedBox(width: 12),
                _buildProgressChip('${total - completed}', 'remaining', AppColors.textMuted),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressChip(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            value,
            style: AppTypography.labelMedium.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: AppTypography.bodySmall.copyWith(color: color),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickStats(progress) {
    return Row(
      children: [
        Expanded(
          child: _AnimatedStatCard(
            emoji: '📚',
            value: '${progress.totalTopicsCompleted}',
            label: 'Topics\nCompleted',
            gradient: AppColors.mintGradient,
            delay: 0,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _AnimatedStatCard(
            emoji: '⏱️',
            value: progress.totalStudyTimeFormatted,
            label: 'Study\nTime',
            gradient: AppColors.oceanGradient,
            delay: 1,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _AnimatedStatCard(
            emoji: '🏆',
            value: '${progress.longestStreak}',
            label: 'Best\nStreak',
            gradient: AppColors.sunsetGradient,
            delay: 2,
          ),
        ),
      ],
    );
  }
}

/// Animated Subject Card with Bounce and Glow
class _AnimatedSubjectCard extends StatefulWidget {
  final String icon;
  final String title;
  final String subtitle;
  final double progress;
  final int completedTopics;
  final int totalTopics;
  final LinearGradient gradient;
  final VoidCallback? onTap;

  const _AnimatedSubjectCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.progress,
    required this.completedTopics,
    required this.totalTopics,
    required this.gradient,
    this.onTap,
  });

  @override
  State<_AnimatedSubjectCard> createState() => _AnimatedSubjectCardState();
}

class _AnimatedSubjectCardState extends State<_AnimatedSubjectCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) {
          setState(() => _isPressed = false);
          widget.onTap?.call();
        },
        onTapCancel: () => setState(() => _isPressed = false),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: AppColors.cardLight,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: widget.gradient.colors.first.withValues(alpha: _isPressed ? 0.25 : 0.15),
                blurRadius: _isPressed ? 25 : 20,
                spreadRadius: _isPressed ? 2 : 0,
                offset: const Offset(0, 4),
              ),
              BoxShadow(
                color: widget.gradient.colors.last.withValues(alpha: _isPressed ? 0.15 : 0.08),
                blurRadius: _isPressed ? 35 : 30,
                spreadRadius: _isPressed ? 2 : 0,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    // Icon with gradient background and glow
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        gradient: widget.gradient,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: widget.gradient.colors.first.withValues(alpha: 0.4),
                            blurRadius: 15,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Text(
                          widget.icon,
                          style: const TextStyle(fontSize: 28),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.title,
                            style: AppTypography.titleMedium.copyWith(
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            widget.subtitle,
                            style: AppTypography.bodySmall,
                          ),
                        ],
                      ),
                    ),
                    // Animated circular progress
                    _AnimatedProgressIndicator(
                      progress: widget.progress,
                      gradient: widget.gradient,
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Animated gradient progress bar
                AnimatedProgressBar(
                  progress: widget.progress,
                  gradient: widget.gradient,
                  height: 8,
                ),
                const SizedBox(height: 12),
                // Stats row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${widget.completedTopics} of ${widget.totalTopics} topics',
                      style: AppTypography.bodySmall,
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        gradient: widget.gradient,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: widget.gradient.colors.first.withValues(alpha: 0.4),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Text(
                        '${widget.progress.toInt()}%',
                        style: AppTypography.labelSmall.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Animated Progress Indicator with Glow
class _AnimatedProgressIndicator extends StatelessWidget {
  final double progress;
  final LinearGradient gradient;

  const _AnimatedProgressIndicator({
    required this.progress,
    required this.gradient,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 56,
      height: 56,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background circle with glow
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: gradient.colors.first.withValues(alpha: 0.15),
                  blurRadius: 10,
                ),
              ],
            ),
            child: CircularProgressIndicator(
              value: 1,
              strokeWidth: 4,
              backgroundColor: Colors.transparent,
              color: gradient.colors.first.withValues(alpha: 0.15),
            ),
          ),
          // Progress circle with gradient
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: progress / 100),
            duration: const Duration(milliseconds: 800),
            curve: Curves.easeOutCubic,
            builder: (context, value, child) {
              return ShaderMask(
                shaderCallback: (bounds) => gradient.createShader(bounds),
                child: SizedBox(
                  width: 56,
                  height: 56,
                  child: CircularProgressIndicator(
                    value: value,
                    strokeWidth: 4,
                    backgroundColor: Colors.transparent,
                    color: Colors.white,
                  ),
                ),
              );
            },
          ),
          // Percentage text
          Text(
            '${progress.toInt()}%',
            style: AppTypography.labelSmall.copyWith(
              fontWeight: FontWeight.w700,
              color: gradient.colors.first,
            ),
          ),
        ],
      ),
    );
  }
}

/// Animated Stat Card with Bounce Effect
class _AnimatedStatCard extends StatefulWidget {
  final String emoji;
  final String value;
  final String label;
  final LinearGradient gradient;
  final int delay;

  const _AnimatedStatCard({
    required this.emoji,
    required this.value,
    required this.label,
    required this.gradient,
    required this.delay,
  });

  @override
  State<_AnimatedStatCard> createState() => _AnimatedStatCardState();
}

class _AnimatedStatCardState extends State<_AnimatedStatCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    // Delay the animation
    Future.delayed(Duration(milliseconds: widget.delay * 100), () {
      if (mounted) _controller.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.cardLight,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.border),
          boxShadow: AppColors.getSoftShadow(),
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(widget.emoji, style: const TextStyle(fontSize: 28)),
            const SizedBox(height: 8),
            ShaderMask(
              shaderCallback: (bounds) => widget.gradient.createShader(bounds),
              child: Text(
                widget.value,
                style: AppTypography.statsSmall.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              widget.label,
              style: AppTypography.bodySmall,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
