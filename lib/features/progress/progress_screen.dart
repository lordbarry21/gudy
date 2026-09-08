import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/modern_cards.dart';
import '../../shared/widgets/animated_widgets.dart';

/// Progress Screen - VIBRANT ANIMATED Design
class ProgressScreen extends ConsumerStatefulWidget {
  const ProgressScreen({super.key});

  @override
  ConsumerState<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends ConsumerState<ProgressScreen>
    with TickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();
  late TabController _tabController;
  late AnimationController _headerController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    )..forward();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _headerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final progress = _progressRepo.getProgress();
    final subjects = _subjectRepo.getAllSubjects();
    final achievements = _progressRepo.getAllAchievements();
    final unlockedAchievements =
        achievements.where((a) => a.unlocked).toList();

    // Calculate stats
    final totalTopics = subjects.fold<int>(0, (sum, s) => sum + s.totalTopics);
    final completedTopics =
        subjects.fold<int>(0, (sum, s) => sum + s.completedTopics);
    final overallProgress =
        totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0.0;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) {
          return [
            SliverToBoxAdapter(
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.all(AppTheme.screenPadding),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Beautiful Animated Header
                      FadeTransition(
                        opacity: _headerController,
                        child: Row(
                          children: [
                            PulsingWidget(
                              child: ShaderMask(
                                shaderCallback: (bounds) =>
                                    AppColors.neonGlowGradient.createShader(bounds),
                                child: Text(
                                  '📊 Progress',
                                  style: AppTypography.displayMedium.copyWith(
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      StaggeredAnimation(
                        index: 1,
                        child: _buildStreakCard(progress),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
            SliverPersistentHeader(
              delegate: _SliverTabBarDelegate(
                Container(
                  margin: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  decoration: BoxDecoration(
                    color: AppColors.cardLight,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: AppColors.getSoftShadow(),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: TabBar(
                    controller: _tabController,
                    indicator: BoxDecoration(
                      gradient: AppColors.mainGradient,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: AppColors.getNeonGlow(
                        AppColors.accentPurple,
                        blur: 10,
                        intensity: 0.3,
                      ),
                    ),
                    indicatorSize: TabBarIndicatorSize.tab,
                    dividerColor: Colors.transparent,
                    labelColor: Colors.white,
                    unselectedLabelColor: AppColors.textSecondary,
                    labelStyle: AppTypography.labelLarge,
                    tabs: const [
                      Tab(text: '📈 Statistics'),
                      Tab(text: '🏆 Achievements'),
                    ],
                  ),
                ),
              ),
              pinned: true,
            ),
          ];
        },
        body: TabBarView(
          controller: _tabController,
          children: [
            _buildStatisticsTab(
                progress, subjects, totalTopics, completedTopics, overallProgress),
            _buildAchievementsTab(achievements, unlockedAchievements),
          ],
        ),
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
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: hasStreak
                    ? Colors.white.withValues(alpha: 0.2)
                    : AppColors.cardElevated,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  '🔥',
                  style: TextStyle(
                    fontSize: 30,
                    color: hasStreak ? null : Colors.grey,
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
                  const SizedBox(height: 4),
                  Text(
                    hasStreak ? 'Keep it up! 💪' : 'Start learning today',
                    style: AppTypography.bodySmall.copyWith(
                      color: hasStreak
                          ? Colors.white.withValues(alpha: 0.8)
                          : AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            if (hasStreak)
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.2),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.local_fire_department,
                  color: Colors.white,
                  size: 28,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatisticsTab(progress, subjects, totalTopics,
      completedTopics, overallProgress) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Overview Card
          StaggeredAnimation(
            index: 0,
            child: NeonGlowContainer(
              glowColor: AppColors.accentPurple,
              blurRadius: 25,
              border: Border.all(
                color: AppColors.accentPurple.withValues(alpha: 0.2),
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: AppColors.cardLight,
                  borderRadius: BorderRadius.circular(24),
                ),
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildStatItem('🔥', '${progress.streak}', 'Streak'),
                        _buildStatItem('📚', '$completedTopics', 'Done'),
                        _buildStatItem('⏱️', progress.totalStudyTimeFormatted, 'Time'),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            AppColors.accentPurple.withValues(alpha: 0.08),
                            AppColors.accentPink.withValues(alpha: 0.05),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  'Overall Progress',
                                  style: AppTypography.titleMedium,
                                ),
                              ),
                              ShaderMask(
                                shaderCallback: (bounds) =>
                                    AppColors.mainGradient.createShader(bounds),
                                child: Text(
                                  '${overallProgress.toStringAsFixed(0)}%',
                                  style: AppTypography.statsMedium.copyWith(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          AnimatedProgressBar(
                            progress: overallProgress,
                            gradient: AppColors.mainGradient,
                            height: 12,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Subject Progress
          StaggeredAnimation(
            index: 1,
            child: Row(
              children: [
                PulsingWidget(
                  child: ShaderMask(
                    shaderCallback: (bounds) =>
                        AppColors.mainGradient.createShader(bounds),
                    child: Text(
                      '📖 Subject Progress',
                      style: AppTypography.titleMedium.copyWith(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          ...subjects.asMap().entries.map((entry) {
            final gradient = AppColors.getSubjectGradient(entry.value.id);
            return StaggeredAnimation(
              index: 2 + entry.key,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _buildSubjectProgressCard(entry.value, gradient),
              ),
            );
          }),

          const SizedBox(height: 100),
        ],
      ),
    );
  }

  Widget _buildStatItem(String emoji, String value, String label) {
    return Column(
      children: [
        Text(emoji, style: const TextStyle(fontSize: 32)),
        const SizedBox(height: 8),
        Text(
          value,
          style: AppTypography.statsSmall.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: AppTypography.bodySmall,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildSubjectProgressCard(subject, LinearGradient gradient) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: gradient.colors.first.withValues(alpha: 0.15),
            blurRadius: 15,
            offset: const Offset(0, 4),
          ),
        ],
        border: Border.all(color: AppColors.border),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              gradient: gradient,
              borderRadius: BorderRadius.circular(14),
              boxShadow: [
                BoxShadow(
                  color: gradient.colors.first.withValues(alpha: 0.4),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Center(
              child: Text(subject.icon, style: const TextStyle(fontSize: 26)),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(subject.name, style: AppTypography.titleSmall),
                const SizedBox(height: 8),
                AnimatedProgressBar(
                  progress: subject.progressPercentage,
                  gradient: gradient,
                  height: 8,
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              gradient: gradient,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: gradient.colors.first.withValues(alpha: 0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Text(
              '${subject.progressPercentage.toStringAsFixed(0)}%',
              style: AppTypography.labelMedium.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAchievementsTab(achievements, unlockedAchievements) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress Overview Card
          StaggeredAnimation(
            index: 0,
            child: Container(
              decoration: BoxDecoration(
                gradient: AppColors.mainGradient,
                borderRadius: BorderRadius.circular(24),
                boxShadow: AppColors.getNeonGlow(
                  AppColors.accentPurple,
                  blur: 25,
                  intensity: 0.5,
                ),
              ),
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text(
                        '${unlockedAchievements.length}',
                        style: AppTypography.statsMedium.copyWith(
                          color: Colors.white,
                          fontSize: 28,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${unlockedAchievements.length} of ${achievements.length}',
                          style: AppTypography.headlineMedium.copyWith(
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Achievements Unlocked',
                          style: AppTypography.bodyMedium.copyWith(
                            color: Colors.white.withValues(alpha: 0.9),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.emoji_events,
                    color: Colors.white,
                    size: 40,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Achievements List
          ...achievements.asMap().entries.map((entry) {
            return StaggeredAnimation(
              index: 1 + entry.key,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _buildAchievementCard(entry.value, entry.value.unlocked),
              ),
            );
          }),

          const SizedBox(height: 100),
        ],
      ),
    );
  }

  Widget _buildAchievementCard(achievement, bool unlocked) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: unlocked
            ? AppColors.getNeonGlow(
                AppColors.accentAmber,
                blur: 15,
                intensity: 0.3,
              )
            : AppColors.getSoftShadow(),
        border: Border.all(
          color: unlocked ? AppColors.accentAmber.withValues(alpha: 0.4) : AppColors.border,
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              gradient: unlocked
                  ? const LinearGradient(
                      colors: [AppColors.accentAmber, AppColors.accentOrange],
                    )
                  : null,
              color: unlocked ? null : AppColors.cardElevated,
              shape: BoxShape.circle,
              boxShadow: unlocked
                  ? [
                      BoxShadow(
                        color: AppColors.accentAmber.withValues(alpha: 0.4),
                        blurRadius: 15,
                        offset: const Offset(0, 4),
                      ),
                    ]
                  : null,
            ),
            child: Center(
              child: Text(
                achievement.icon,
                style: TextStyle(
                  fontSize: 28,
                  color: unlocked ? null : Colors.grey.withValues(alpha: 0.4),
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  achievement.title,
                  style: AppTypography.titleSmall.copyWith(
                    color: unlocked
                        ? AppColors.textPrimary
                        : AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  achievement.description,
                  style: AppTypography.bodySmall,
                ),
              ],
            ),
          ),
          if (unlocked)
            PulsingWidget(
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppColors.accentAmber, AppColors.accentOrange],
                  ),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.check,
                  color: Colors.white,
                  size: 16,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _SliverTabBarDelegate extends SliverPersistentHeaderDelegate {
  final Container tabBar;

  _SliverTabBarDelegate(this.tabBar);

  @override
  double get minExtent => 48;

  @override
  double get maxExtent => 48;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return tabBar;
  }

  @override
  bool shouldRebuild(_SliverTabBarDelegate oldDelegate) => false;
}
