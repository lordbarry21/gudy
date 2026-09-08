import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../shared/widgets/modern_cards.dart';
import '../../shared/widgets/animated_widgets.dart';

/// Learn Screen - VIBRANT ANIMATED Design
class LearnScreen extends ConsumerStatefulWidget {
  const LearnScreen({super.key});

  @override
  ConsumerState<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends ConsumerState<LearnScreen>
    with TickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  late AnimationController _headerController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _headerController,
      curve: Curves.easeOut,
    );
    _headerController.forward();
  }

  @override
  void dispose() {
    _headerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final subjects = _subjectRepo.getAllSubjects();

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // Beautiful Header with Gradient
            SliverToBoxAdapter(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: Container(
                  padding: const EdgeInsets.all(AppTheme.screenPadding),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        AppColors.accentPurple.withValues(alpha: 0.12),
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
                          PulsingWidget(
                            child: ShaderMask(
                              shaderCallback: (bounds) =>
                                  AppColors.neonGlowGradient.createShader(bounds),
                              child: Text(
                                '📚 Learn',
                                style: AppTypography.displayMedium.copyWith(
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Choose your path to success',
                        style: AppTypography.bodyMedium.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 24)),

            // Subject list with beautiful animated cards
            SliverPadding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppTheme.screenPadding,
              ),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final subject = subjects[index];
                    return StaggeredAnimation(
                      index: index,
                      child: Padding(
                        padding:
                            const EdgeInsets.only(bottom: AppTheme.spacing16),
                        child: _AnimatedSubjectCard(
                          icon: subject.icon,
                          title: subject.name,
                          subtitle: subject.description.isNotEmpty
                              ? subject.description
                              : subject.subtitle,
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
                  childCount: subjects.length,
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
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
                color: widget.gradient.colors.first.withValues(alpha: _isPressed ? 0.3 : 0.2),
                blurRadius: _isPressed ? 30 : 20,
                spreadRadius: _isPressed ? 2 : 0,
                offset: const Offset(0, 4),
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
                            color: widget.gradient.colors.first.withValues(alpha: 0.5),
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
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
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
                  color: gradient.colors.first.withValues(alpha: 0.2),
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
