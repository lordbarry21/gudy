import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/progress_bar.dart';
import '../../shared/widgets/streak_badge.dart';

/// Progress Screen - Statistics & Achievements
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
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: NestedScrollView(
          headerSliverBuilder: (context, innerBoxIsScrolled) {
            return [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(AppTheme.screenPadding),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Progress', style: AppTypography.heading1),
                      const SizedBox(height: AppTheme.spacingLg),
                      StreakBadge(streak: progress.streak),
                      const SizedBox(height: AppTheme.spacingLg),
                    ],
                  ),
                ),
              ),
              SliverPersistentHeader(
                delegate: _SliverTabBarDelegate(
                  TabBar(
                    controller: _tabController,
                    indicatorColor: AppColors.accentSuccess,
                    labelColor: AppColors.textPrimary,
                    unselectedLabelColor: AppColors.textSecondary,
                    tabs: const [
                      Tab(text: 'Statistics'),
                      Tab(text: 'Achievements'),
                    ],
                  ),
                ),
                pinned: true,
              ),
            ];
          },
          body: TabBarView(
            controller: _tabController,
            children: [
              // Statistics tab
              _buildStatisticsTab(
                  progress, subjects, totalTopics, completedTopics, overallProgress),
              // Achievements tab
              _buildAchievementsTab(achievements, unlockedAchievements),
            ],
          ),
        ),
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
          // Overview card
          _buildOverviewCard(
              progress, totalTopics, completedTopics, overallProgress),
          const SizedBox(height: AppTheme.spacingLg),

          // Subject progress
          Text('Subject Progress', style: AppTypography.heading4),
          const SizedBox(height: AppTheme.spacingMd),
          ...subjects.map((subject) => Padding(
                padding: const EdgeInsets.only(bottom: AppTheme.spacingSm),
                child: _buildSubjectProgressCard(subject),
              )),

          const SizedBox(height: AppTheme.spacingLg),

          // Study time
          Text('Study Stats', style: AppTypography.heading4),
          const SizedBox(height: AppTheme.spacingMd),
          _buildStudyStatsCard(progress),

          const SizedBox(height: AppTheme.spacingXxl),
        ],
      ),
    );
  }

  Widget _buildOverviewCard(progress, totalTopics, completedTopics, overallProgress) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.accentSuccess.withOpacity(0.2),
            AppColors.accentInfo.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.accentSuccess.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatItem(
                '🔥',
                '${progress.streak}',
                'Day Streak',
              ),
              _buildStatItem(
                '📚',
                '$completedTopics',
                'Topics Done',
              ),
              _buildStatItem(
                '⏱️',
                progress.totalStudyTimeFormatted,
                'Study Time',
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingLg),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Overall Progress',
                      style: AppTypography.label,
                    ),
                    const SizedBox(height: AppTheme.spacingSm),
                    ProgressBar(
                      percentage: overallProgress,
                      height: 12,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppTheme.spacingMd),
              Text(
                '${overallProgress.toStringAsFixed(0)}%',
                style: AppTypography.stats.copyWith(
                  color: AppColors.accentSuccess,
                  fontSize: 24,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String emoji, String value, String label) {
    return Column(
      children: [
        Text(emoji, style: const TextStyle(fontSize: 28)),
        const SizedBox(height: AppTheme.spacingXs),
        Text(
          value,
          style: AppTypography.stats,
        ),
        Text(
          label,
          style: AppTypography.caption,
        ),
      ],
    );
  }

  Widget _buildSubjectProgressCard(subject) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: subject.color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Text(subject.icon, style: const TextStyle(fontSize: 20)),
            ),
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(subject.name, style: AppTypography.label),
                const SizedBox(height: 4),
                ProgressBar(
                  percentage: subject.progressPercentage,
                  height: 6,
                  fillColor: subject.color,
                ),
              ],
            ),
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Text(
            '${subject.progressPercentage.toStringAsFixed(0)}%',
            style: AppTypography.label.copyWith(color: subject.color),
          ),
        ],
      ),
    );
  }

  Widget _buildStudyStatsCard(progress) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          _buildStatRow('Total Study Days', '${progress.totalStudyDays}'),
          const Divider(height: AppTheme.spacingLg),
          _buildStatRow('Longest Streak', '${progress.longestStreak} days'),
          const Divider(height: AppTheme.spacingLg),
          _buildStatRow('Daily Goal', '${progress.dailyGoal} topics/day'),
        ],
      ),
    );
  }

  Widget _buildStatRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: AppTypography.body),
        Text(
          value,
          style: AppTypography.label.copyWith(color: AppColors.accentSuccess),
        ),
      ],
    );
  }

  Widget _buildAchievementsTab(achievements, unlockedAchievements) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppTheme.screenPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress overview
          Container(
            padding: const EdgeInsets.all(AppTheme.cardPadding),
            decoration: BoxDecoration(
              color: AppColors.cardBackground,
              borderRadius: BorderRadius.circular(AppTheme.cardRadius),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: AppColors.accentSuccess.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      '${unlockedAchievements.length}',
                      style: AppTypography.stats.copyWith(
                        color: AppColors.accentSuccess,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${unlockedAchievements.length} of ${achievements.length} Achievements',
                        style: AppTypography.heading4,
                      ),
                      const SizedBox(height: 4),
                      ProgressBar(
                        percentage: _progressRepo.getAchievementProgress(),
                        height: 8,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          // Recently unlocked
          if (unlockedAchievements.isNotEmpty) ...[
            Text('Recently Unlocked', style: AppTypography.heading4),
            const SizedBox(height: AppTheme.spacingMd),
            ...unlockedAchievements
                .where((a) => a.isRecentlyUnlocked)
                .take(3)
                .map((a) => Padding(
                      padding: const EdgeInsets.only(bottom: AppTheme.spacingSm),
                      child: _buildAchievementCard(a, true),
                    )),
            const SizedBox(height: AppTheme.spacingLg),
          ],

          // All achievements
          Text('All Achievements', style: AppTypography.heading4),
          const SizedBox(height: AppTheme.spacingMd),
          ...achievements.map((a) => Padding(
                padding: const EdgeInsets.only(bottom: AppTheme.spacingSm),
                child: _buildAchievementCard(a, a.unlocked),
              )),

          const SizedBox(height: AppTheme.spacingXxl),
        ],
      ),
    );
  }

  Widget _buildAchievementCard(achievement, bool unlocked) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: unlocked
            ? AppColors.accentSuccess.withOpacity(0.1)
            : AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(
          color: unlocked
              ? AppColors.accentSuccess.withOpacity(0.3)
              : AppColors.border,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: unlocked
                  ? AppColors.accentSuccess.withOpacity(0.2)
                  : AppColors.border.withOpacity(0.5),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                achievement.icon,
                style: TextStyle(
                  fontSize: 24,
                  color: unlocked ? null : Colors.grey,
                ),
              ),
            ),
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  achievement.title,
                  style: AppTypography.label.copyWith(
                    color: unlocked
                        ? AppColors.textPrimary
                        : AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  achievement.description,
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          if (unlocked)
            const Icon(
              Icons.check_circle,
              color: AppColors.accentSuccess,
              size: 24,
            ),
        ],
      ),
    );
  }
}

class _SliverTabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;

  _SliverTabBarDelegate(this.tabBar);

  @override
  double get minExtent => tabBar.preferredSize.height;

  @override
  double get maxExtent => tabBar.preferredSize.height;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
      color: AppColors.primaryBackground,
      child: tabBar,
    );
  }

  @override
  bool shouldRebuild(_SliverTabBarDelegate oldDelegate) => false;
}
