import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../shared/widgets/subject_card.dart';

/// Learn Screen - Subject List
class LearnScreen extends ConsumerStatefulWidget {
  const LearnScreen({super.key});

  @override
  ConsumerState<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends ConsumerState<LearnScreen> {
  final _subjectRepo = SubjectRepository();

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
                    Text(
                      'Learn',
                      style: AppTypography.heading1,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Select a subject to start learning',
                      style: AppTypography.bodyLarge.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Subject list
            SliverPadding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final subject = subjects[index];
                    return Padding(
                      padding:
                          const EdgeInsets.only(bottom: AppTheme.spacingMd),
                      child: SubjectCard(
                        subject: subject,
                        onTap: () {
                          context.push('/learn/${subject.id}');
                        },
                      ),
                    );
                  },
                  childCount: subjects.length,
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
}
