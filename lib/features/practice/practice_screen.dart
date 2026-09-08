import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../shared/widgets/modern_cards.dart';

/// Practice Screen - Beautiful Gradient Design
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
      backgroundColor: AppColors.backgroundLight,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Beautiful Header
            SliverToBoxAdapter(
              child: Container(
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
                    ShaderMask(
                      shaderCallback: (bounds) =>
                          AppColors.mainGradient.createShader(bounds),
                      child: Text(
                        'Practice',
                        style: AppTypography.displayMedium.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Test your knowledge and level up',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 20)),

            // Subject filter with beautiful chips
            SliverToBoxAdapter(
              child: SizedBox(
                height: 50,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppTheme.screenPadding),
                  itemCount: subjects.length + 1,
                  itemBuilder: (context, index) {
                    if (index == 0) {
                      return Padding(
                        padding: const EdgeInsets.only(right: 10),
                        child: _buildFilterChip('all', '✨ All', _selectedSubject, null),
                      );
                    }
                    final subject = subjects[index - 1];
                    return Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: _buildFilterChip(
                        subject.id,
                        '${subject.icon} ${subject.name}',
                        _selectedSubject,
                        AppColors.getSubjectGradient(subject.id),
                      ),
                    );
                  },
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 24)),

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
                          const EdgeInsets.only(bottom: AppTheme.spacing16),
                      child: _buildPracticeCard(item),
                    );
                  },
                  childCount: _getPracticeItems().length,
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterChip(String id, String label, String selectedId, LinearGradient? gradient) {
    final isSelected = id == selectedId;

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedSubject = id;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          gradient: isSelected && gradient != null ? gradient : null,
          color: isSelected && gradient == null ? AppColors.accentPurple : null,
          borderRadius: BorderRadius.circular(25),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: (isSelected && gradient != null
                            ? gradient.colors.first
                            : AppColors.accentPurple)
                        .withValues(alpha: 0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Text(
          label,
          style: AppTypography.labelMedium.copyWith(
            color: isSelected ? Colors.white : AppColors.textSecondary,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
          ),
        ),
      ),
    );
  }

  Widget _buildPracticeCard(PracticeItem item) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppColors.getSoftShadow(),
        border: Border.all(color: AppColors.border),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        item.color.withValues(alpha: 0.15),
                        item.color.withValues(alpha: 0.05),
                      ],
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Center(
                    child: Text(item.icon, style: const TextStyle(fontSize: 30)),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.title,
                        style: AppTypography.titleMedium.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item.subtitle,
                        style: AppTypography.bodySmall,
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          _buildInfoChip('📝', '${item.questionCount}'),
                          const SizedBox(width: 10),
                          _buildInfoChip('⭐', item.difficulty),
                        ],
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: item.color.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.play_arrow_rounded,
                    color: item.color,
                    size: 28,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInfoChip(String icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(icon, style: const TextStyle(fontSize: 12)),
          const SizedBox(width: 4),
          Text(
            text,
            style: AppTypography.labelSmall.copyWith(
              color: AppColors.textSecondary,
            ),
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

      final gradient = AppColors.getSubjectGradient(subject.id);

      items.add(PracticeItem(
        id: '${subject.id}_practice',
        title: 'Practice ${subject.name}',
        subtitle: 'Test your knowledge',
        icon: subject.icon,
        color: gradient.colors.first,
        questionCount: subject.totalTopics * 5,
        difficulty: _getDifficultyText(subject.progressPercentage),
      ));

      items.add(PracticeItem(
        id: '${subject.id}_quick',
        title: 'Quick Quiz',
        subtitle: '5 questions • Fast paced',
        icon: '⚡',
        color: gradient.colors.first,
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
