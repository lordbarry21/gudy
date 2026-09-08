import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/modern_cards.dart';

/// Home Dashboard Screen - Beautiful Gradient Design
class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with SingleTickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOut,
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
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

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: SafeArea(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: CustomScrollView(
            slivers: [
              // Beautiful Gradient Header
              SliverToBoxAdapter(
                child: _buildHeader(progress),
              ),

              // Streak Card with Gradient
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  child: _buildStreakCard(progress),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 20)),

              // Overall Progress with Gradient
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  child: _buildOverallProgress(
                      overallProgress, completedTopics, totalTopics),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 24)),

              // Quick Stats
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  child: _buildQuickStats(progress),
                ),
              ),

              const SliverToBoxAdapter(child: SizedBox(height: 28)),

              // Subjects Section with gradient title
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      ShaderMask(
                        shaderCallback: (bounds) =>
                            AppColors.mainGradient.createShader(bounds),
                        child: Text(
                          'Your Subjects',
                          style: AppTypography.headlineSmall.copyWith(
                            color: Colors.white,
                          ),
                        ),
                      ),
                      TextButton(
                        onPressed: () => context.go('/learn'),
                        child: ShaderMask(
                          shaderCallback: (bounds) =>
                              AppColors.mainGradient.createShader(bounds),
                          child: Text(
                            'See all',
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

              // Subject cards with beautiful design
              SliverPadding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding,
                ),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final subject = subjects[index];
                      return Padding(
                        padding:
                            const EdgeInsets.only(bottom: AppTheme.spacing16),
                        child: SubjectCardModern(
                          icon: subject.icon,
                          title: subject.name,
                          subtitle: subject.subtitle,
                          progress: subject.progressPercentage,
                          completedTopics: subject.completedTopics,
                          totalTopics: subject.totalTopics,
                          gradient: AppColors.getSubjectGradient(subject.id),
                          onTap: () => context.push('/learn/${subject.id}'),
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
            AppColors.accentPurple.withValues(alpha: 0.08),
            AppColors.accentPink.withValues(alpha: 0.05),
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
                          AppColors.mainGradient.createShader(bounds),
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
              // Decorative gradient circle
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  gradient: AppColors.mainGradient,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.accentPurple.withValues(alpha: 0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 8),
                    ),
                  ],
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
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStreakCard(progress) {
    return Container(
      decoration: BoxDecoration(
        gradient: progress.streak > 0
            ? const LinearGradient(
                colors: [Color(0xFFFB923C), Color(0xFFF472B6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : null,
        color: progress.streak > 0 ? null : AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: progress.streak > 0
            ? [
                BoxShadow(
                  color: AppColors.accentOrange.withValues(alpha: 0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ]
            : AppColors.getSoftShadow(),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          // Fire icon
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: progress.streak > 0
                  ? Colors.white.withValues(alpha: 0.2)
                  : AppColors.cardElevated,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                '🔥',
                style: TextStyle(
                  fontSize: 28,
                  color: progress.streak > 0 ? null : Colors.grey,
                ),
              ),
            ),
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
                        color: progress.streak > 0
                            ? Colors.white
                            : AppColors.textSecondary,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      'day streak',
                      style: AppTypography.bodyMedium.copyWith(
                        color: progress.streak > 0
                            ? Colors.white.withValues(alpha: 0.9)
                            : AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 2),
                Text(
                  progress.streak > 0 ? "Keep it up!" : 'Start your learning today',
                  style: AppTypography.bodySmall.copyWith(
                    color: progress.streak > 0
                        ? Colors.white.withValues(alpha: 0.8)
                        : AppColors.textMuted,
                  ),
                ),
              ],
            ),
          ),
          // Decorative element
          if (progress.streak > 0)
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
    );
  }

  Widget _buildOverallProgress(
      double progress, int completed, int total) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppColors.getSoftShadow(),
        border: Border.all(color: AppColors.border),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Overall Progress',
                style: AppTypography.titleMedium,
              ),
              ShaderMask(
                shaderCallback: (bounds) =>
                    AppColors.mainGradient.createShader(bounds),
                child: Text(
                  '${progress.toStringAsFixed(0)}%',
                  style: AppTypography.statsSmall.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Gradient progress bar
          Container(
            height: 10,
            decoration: BoxDecoration(
              color: AppColors.border,
              borderRadius: BorderRadius.circular(5),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: progress / 100,
              child: Container(
                decoration: BoxDecoration(
                  gradient: AppColors.mainGradient,
                  borderRadius: BorderRadius.circular(5),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.accentPurple.withValues(alpha: 0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
              ),
            ),
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
    );
  }

  Widget _buildProgressChip(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
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
          const SizedBox(width: 4),
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
          child: StatCard(
            emoji: '📚',
            value: '${progress.totalTopicsCompleted}',
            label: 'Topics\nCompleted',
            gradient: AppColors.mintGradient,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: StatCard(
            emoji: '⏱️',
            value: progress.totalStudyTimeFormatted,
            label: 'Study\nTime',
            gradient: AppColors.oceanGradient,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: StatCard(
            emoji: '🏆',
            value: '${progress.longestStreak}',
            label: 'Best\nStreak',
            gradient: AppColors.sunsetGradient,
          ),
        ),
      ],
    );
  }
}
