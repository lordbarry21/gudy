import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../shared/widgets/modern_cards.dart';

/// Learn Screen - Beautiful Gradient Design
class LearnScreen extends ConsumerStatefulWidget {
  const LearnScreen({super.key});

  @override
  ConsumerState<LearnScreen> createState() => _LearnScreenState();
}

class _LearnScreenState extends ConsumerState<LearnScreen>
    with SingleTickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
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
    final subjects = _subjectRepo.getAllSubjects();

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: SafeArea(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: CustomScrollView(
            slivers: [
              // Beautiful Header with Gradient
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
                          'Learn',
                          style: AppTypography.displayMedium.copyWith(
                            color: Colors.white,
                          ),
                        ),
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

              const SliverToBoxAdapter(child: SizedBox(height: 24)),

              // Subject list with beautiful cards
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
                          subtitle: subject.description.isNotEmpty
                              ? subject.description
                              : subject.subtitle,
                          progress: subject.progressPercentage,
                          completedTopics: subject.completedTopics,
                          totalTopics: subject.totalTopics,
                          gradient: AppColors.getSubjectGradient(subject.id),
                          onTap: () => context.push('/learn/${subject.id}'),
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
      ),
    );
  }
}
