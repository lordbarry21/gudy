import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/modern_cards.dart';

/// Progress Screen - Beautiful Gradient Design
class ProgressScreen extends ConsumerStatefulWidget {
  const ProgressScreen({super.key});

  @override
  ConsumerState<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends ConsumerState<ProgressScreen>
    with SingleTickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
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
                      // Beautiful Header
                      ShaderMask(
                        shaderCallback: (bounds) =>
                            AppColors.mainGradient.createShader(bounds),
                        child: Text(
                          'Progress',
                          style: AppTypography.displayMedium.copyWith(
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      _buildStreakCard(progress),
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
                    ),
                    indicatorSize: TabBarIndicatorSize.tab,
                    dividerColor: Colors.transparent,
                    labelColor: Colors.white,
                    unselectedLabelColor: AppColors.textSecondary,
                    labelStyle: AppTypography.labelLarge,
                    tabs: const [
                      Tab(text: 'Statistics'),
                      Tab(text: 'Achievements'),
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
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Container(
            width: 60,
            height: 60,
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
                  fontSize: 30,
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
                const SizedBox(height: 4),
                Text(
                  progress.streak > 0 ? 'Keep it up!' : 'Start learning today',
                  style: AppTypography.bodySmall.copyWith(
                    color: progress.streak > 0
                        ? Colors.white.withValues(alpha: 0.8)
                        : AppColors.textMuted,
                  ),
                ),
              ],
            ),
          ),
          if (progress.streak > 0)
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
    );
  }

  Widget _buildStatisticsTab(progress, subjects, totalTopics,
      completedTopics, overallProgress) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Overview Card
          Container(
            decoration: BoxDecoration(
              color: AppColors.cardLight,
              borderRadius: BorderRadius.circular(24),
              boxShadow: AppColors.getSoftShadow(),
              border: Border.all(color: AppColors.border),
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
                        AppColors.accentPurple.withValues(alpha: 0.05),
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
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Container(
                        height: 10,
                        decoration: BoxDecoration(
                          color: AppColors.border,
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: FractionallySizedBox(
                          alignment: Alignment.centerLeft,
                          widthFactor: overallProgress / 100,
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: AppColors.mainGradient,
                              borderRadius: BorderRadius.circular(5),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Subject Progress
          ShaderMask(
            shaderCallback: (bounds) =>
                AppColors.mainGradient.createShader(bounds),
            child: Text(
              'Subject Progress',
              style: AppTypography.titleMedium.copyWith(
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: 16),
          ...subjects.map((subject) {
            final gradient = AppColors.getSubjectGradient(subject.id);
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _buildSubjectProgressCard(subject, gradient),
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
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppColors.getSoftShadow(),
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
                  color: gradient.colors.first.withValues(alpha: 0.3),
                  blurRadius: 8,
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
                Container(
                  height: 8,
                  decoration: BoxDecoration(
                    color: gradient.colors.first.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: FractionallySizedBox(
                    alignment: Alignment.centerLeft,
                    widthFactor: subject.progressPercentage / 100,
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: gradient,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ),
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
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress Overview Card
          Container(
            decoration: BoxDecoration(
              gradient: AppColors.mainGradient,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: AppColors.accentPurple.withValues(alpha: 0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
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
          const SizedBox(height: 24),

          // Achievements List
          ...achievements.map((a) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _buildAchievementCard(a, a.unlocked),
              )),

          const SizedBox(height: 100),
        ],
      ),
    );
  }

  Widget _buildAchievementCard(achievement, bool unlocked) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppColors.getSoftShadow(),
        border: Border.all(
          color: unlocked ? AppColors.accentAmber.withValues(alpha: 0.3) : AppColors.border,
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
                        color: AppColors.accentAmber.withValues(alpha: 0.3),
                        blurRadius: 12,
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
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
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
