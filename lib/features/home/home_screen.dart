import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/progress_bar.dart';

/// Home Dashboard Screen
class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();

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
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(AppTheme.screenPadding),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildHeader(progress),
                    const SizedBox(height: AppTheme.spacingLg),
                    _buildStreakCard(progress),
                    const SizedBox(height: AppTheme.spacingLg),
                    _buildOverallProgress(overallProgress, completedTopics, totalTopics),
                  ],
                ),
              ),
            ),

            // Today's Goals Section
            SliverToBoxAdapter(
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: AppTheme.screenPadding),
                child: Text(
                  "Today's Goals",
                  style: AppTypography.heading3,
                ),
              ),
            ),

            const SliverToBoxAdapter(
              child: SizedBox(height: AppTheme.spacingMd),
            ),

            // Goals list
            SliverPadding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final inProgressSubjects = subjects
                        .where((s) => s.progressPercentage > 0 && s.progressPercentage < 100)
                        .take(3)
                        .toList();

                    if (index >= inProgressSubjects.length) {
                      // Show a suggestion card if no in-progress subjects
                      if (index == inProgressSubjects.length &&
                          inProgressSubjects.isEmpty) {
                        return _buildSuggestionCard();
                      }
                      return const SizedBox.shrink();
                    }

                    final subject = inProgressSubjects[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: AppTheme.spacingSm),
                      child: _buildGoalCard(subject),
                    );
                  },
                  childCount: subjects
                          .where((s) => s.progressPercentage > 0 && s.progressPercentage < 100)
                          .length +
                      1,
                ),
              ),
            ),

            const SliverToBoxAdapter(
              child: SizedBox(height: AppTheme.spacingLg),
            ),

            // Recent Activity Section
            SliverToBoxAdapter(
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: AppTheme.screenPadding),
                child: Text(
                  'Quick Access',
                  style: AppTypography.heading3,
                ),
              ),
            ),

            const SliverToBoxAdapter(
              child: SizedBox(height: AppTheme.spacingMd),
            ),

            // Quick access grid
            SliverPadding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: AppTheme.spacingSm,
                  crossAxisSpacing: AppTheme.spacingSm,
                  childAspectRatio: 1.5,
                ),
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    if (index >= subjects.length) return const SizedBox.shrink();
                    return _buildQuickAccessCard(subjects[index]);
                  },
                  childCount: subjects.length.clamp(0, 4),
                ),
              ),
            ),

            const SliverToBoxAdapter(
              child: SizedBox(height: AppTheme.spacingXxl),
            ),
          ],
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

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '$greeting! 👋',
              style: AppTypography.bodyLarge.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              progress.userName,
              style: AppTypography.heading1,
            ),
          ],
        ),
        Row(
          children: [
            IconButton(
              icon: const Icon(Icons.notifications_outlined),
              color: AppColors.textSecondary,
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.settings_outlined),
              color: AppColors.textSecondary,
              onPressed: () {},
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStreakCard(progress) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        gradient: progress.streak > 0 ? AppColors.fireGradient : null,
        color: progress.streak > 0 ? null : AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(
          color: progress.streak > 0
              ? AppColors.streakFire.withOpacity(0.5)
              : AppColors.border,
        ),
      ),
      child: Row(
        children: [
          const Text('🔥', style: TextStyle(fontSize: 32)),
          const SizedBox(width: AppTheme.spacingMd),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${progress.streak} day streak!',
                  style: AppTypography.heading4.copyWith(
                    color: progress.streak > 0
                        ? AppColors.textPrimary
                        : AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  progress.streak > 0
                      ? "Keep it up! You're doing great!"
                      : 'Start your streak today!',
                  style: AppTypography.bodySmall.copyWith(
                    color: progress.streak > 0
                        ? AppColors.textPrimary.withOpacity(0.8)
                        : AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          if (progress.longestStreak > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.whiteMedium,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                'Best: ${progress.longestStreak}',
                style: AppTypography.caption.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildOverallProgress(double progress, int completed, int total) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Overall Progress',
                style: AppTypography.heading4,
              ),
              Text(
                '${progress.toStringAsFixed(0)}%',
                style: AppTypography.stats.copyWith(
                  color: AppColors.accentSuccess,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingMd),
          ProgressBar(
            percentage: progress,
            height: 10,
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            '$completed of $total topics completed',
            style: AppTypography.bodySmall,
          ),
        ],
      ),
    );
  }

  Widget _buildGoalCard(subject) {
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
                Text(
                  subject.name,
                  style: AppTypography.label,
                ),
                const SizedBox(height: 4),
                ProgressBar(
                  percentage: subject.progressPercentage,
                  height: 4,
                  fillColor: subject.color,
                ),
              ],
            ),
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Icon(
            Icons.arrow_forward_ios,
            size: 16,
            color: AppColors.textTertiary,
          ),
        ],
      ),
    );
  }

  Widget _buildSuggestionCard() {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.accentSuccess.withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.accentSuccess.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.accentSuccess.withOpacity(0.2),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Center(
              child: Text('🎯', style: TextStyle(fontSize: 20)),
            ),
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Start your journey!',
                  style: AppTypography.label.copyWith(
                    color: AppColors.accentSuccess,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Pick a subject to begin learning',
                  style: AppTypography.bodySmall,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAccessCard(subject) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(subject.icon, style: const TextStyle(fontSize: 24)),
          const Spacer(),
          Text(
            subject.name,
            style: AppTypography.label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            '${subject.progressPercentage.toInt()}%',
            style: AppTypography.caption.copyWith(
              color: subject.color,
            ),
          ),
        ],
      ),
    );
  }
}
