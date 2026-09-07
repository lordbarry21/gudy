import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';

/// Practice Screen - Question Bank
class PracticeScreen extends ConsumerStatefulWidget {
  const PracticeScreen({super.key});

  @override
  ConsumerState<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends ConsumerState<PracticeScreen> {
  final _subjectRepo = SubjectRepository();
  String _selectedSubject = 'all';

  @override
  Widget build(BuildContext context) {
    final subjects = _subjectRepo.getAllSubjects();

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
                    Text('Practice', style: AppTypography.heading1),
                    const SizedBox(height: 4),
                    Text(
                      'Test your knowledge with practice questions',
                      style: AppTypography.bodyLarge.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Subject filter
            SliverToBoxAdapter(
              child: SizedBox(
                height: 40,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  itemCount: subjects.length + 1,
                  itemBuilder: (context, index) {
                    if (index == 0) {
                      return Padding(
                        padding: const EdgeInsets.only(right: AppTheme.spacingSm),
                        child: _buildFilterChip('all', 'All', _selectedSubject),
                      );
                    }
                    final subject = subjects[index - 1];
                    return Padding(
                      padding: const EdgeInsets.only(right: AppTheme.spacingSm),
                      child: _buildFilterChip(
                        subject.id,
                        '${subject.icon} ${subject.name}',
                        _selectedSubject,
                      ),
                    );
                  },
                ),
              ),
            ),

            const SliverToBoxAdapter(
              child: SizedBox(height: AppTheme.spacingLg),
            ),

            // Practice cards
            SliverPadding(
              padding:
                  const EdgeInsets.symmetric(horizontal: AppTheme.screenPadding),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final practiceItems = _getPracticeItems();
                    if (index >= practiceItems.length) {
                      return const SizedBox.shrink();
                    }
                    final item = practiceItems[index];
                    return Padding(
                      padding:
                          const EdgeInsets.only(bottom: AppTheme.spacingMd),
                      child: _buildPracticeCard(item),
                    );
                  },
                  childCount: _getPracticeItems().length,
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

  Widget _buildFilterChip(String id, String label, String selectedId) {
    final isSelected = id == selectedId;

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedSubject = id;
        });
      },
      child: AnimatedContainer(
        duration: AppTheme.animMicro,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.accentSuccess : AppColors.cardBackground,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? AppColors.accentSuccess : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: AppTypography.label.copyWith(
            color: isSelected
                ? AppColors.primaryBackground
                : AppColors.textSecondary,
          ),
        ),
      ),
    );
  }

  Widget _buildPracticeCard(PracticeItem item) {
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
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: item.color.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Text(item.icon, style: const TextStyle(fontSize: 24)),
                ),
              ),
              const SizedBox(width: AppTheme.spacingMd),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(item.title, style: AppTypography.heading4),
                    const SizedBox(height: 4),
                    Text(
                      item.subtitle,
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.arrow_forward_ios,
                size: 16,
                color: AppColors.textTertiary,
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingMd),
          Row(
            children: [
              _buildInfoChip('📝', '${item.questionCount} questions'),
              const SizedBox(width: AppTheme.spacingSm),
              _buildInfoChip('⭐', item.difficulty),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInfoChip(String icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.border.withOpacity(0.5),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(icon, style: const TextStyle(fontSize: 12)),
          const SizedBox(width: 4),
          Text(
            text,
            style: AppTypography.caption,
          ),
        ],
      ),
    );
  }

  List<PracticeItem> _getPracticeItems() {
    final subjects = _subjectRepo.getAllSubjects();
    final items = <PracticeItem>[];

    for (final subject in subjects) {
      if (_selectedSubject != 'all' && subject.id != _selectedSubject) continue;

      items.add(PracticeItem(
        id: '${subject.id}_practice',
        title: 'Practice ${subject.name}',
        subtitle: 'Test your knowledge',
        icon: subject.icon,
        color: subject.color,
        questionCount: subject.totalTopics * 5,
        difficulty: _getDifficultyText(subject.progressPercentage),
      ));

      // Add specific practice types
      items.add(PracticeItem(
        id: '${subject.id}_quick',
        title: 'Quick Quiz',
        subtitle: '5 questions • 2 minutes',
        icon: '⚡',
        color: subject.color,
        questionCount: 5,
        difficulty: 'Quick',
      ));
    }

    return items;
  }

  String _getDifficultyText(double progress) {
    if (progress < 25) return 'Beginner';
    if (progress < 50) return 'Intermediate';
    if (progress < 75) return 'Advanced';
    return 'Expert';
  }
}

class PracticeItem {
  final String id;
  final String title;
  final String subtitle;
  final String icon;
  final Color color;
  final int questionCount;
  final String difficulty;

  PracticeItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.questionCount,
    required this.difficulty,
  });
}
