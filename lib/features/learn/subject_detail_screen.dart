import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/models/subject.dart';
import '../../../data/models/topic.dart';
import '../../../data/models/mastery_status.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/progress_bar.dart';
import '../../shared/widgets/modern_cards.dart';
import '../../shared/widgets/mind_map_view.dart';

/// Subject Detail Screen - Beautiful Gradient Design
class SubjectDetailScreen extends ConsumerStatefulWidget {
  final String subjectId;

  const SubjectDetailScreen({
    super.key,
    required this.subjectId,
  });

  @override
  ConsumerState<SubjectDetailScreen> createState() =>
      _SubjectDetailScreenState();
}

class _SubjectDetailScreenState extends ConsumerState<SubjectDetailScreen>
    with SingleTickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();
  final Set<String> _expandedNodes = {};
  bool _showMindMap = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final rootTopics = _subjectRepo.getRootTopics(widget.subjectId);
      setState(() {
        _expandedNodes.addAll(rootTopics.map((t) => t.id));
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final subject = _subjectRepo.getSubject(widget.subjectId);
    final rootTopics = _subjectRepo.getRootTopics(widget.subjectId);

    if (subject == null) {
      return const Scaffold(
        body: Center(child: Text('Subject not found')),
      );
    }

    final subjectGradient = AppColors.getSubjectGradient(widget.subjectId);
    final subjectColor = subjectGradient.colors.first;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      body: CustomScrollView(
        slivers: [
          // App Bar with Gradient
          SliverAppBar(
            expandedHeight: 180,
            floating: false,
            pinned: true,
            backgroundColor: Colors.transparent,
            leading: Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.cardLight,
                borderRadius: BorderRadius.circular(12),
                boxShadow: AppColors.getSoftShadow(),
              ),
              child: IconButton(
                icon: const Icon(Icons.arrow_back, size: 20),
                onPressed: () => context.pop(),
              ),
            ),
            actions: [
              // View toggle
              Container(
                margin: const EdgeInsets.only(right: 16),
                decoration: BoxDecoration(
                  color: AppColors.cardLight,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: AppColors.getSoftShadow(),
                ),
                child: Row(
                  children: [
                    _buildViewToggle(
                      icon: Icons.account_tree,
                      isSelected: _showMindMap,
                      onTap: () => setState(() => _showMindMap = true),
                      gradient: subjectGradient,
                    ),
                    _buildViewToggle(
                      icon: Icons.list,
                      isSelected: !_showMindMap,
                      onTap: () => setState(() => _showMindMap = false),
                      gradient: subjectGradient,
                    ),
                  ],
                ),
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      subjectColor.withValues(alpha: 0.15),
                      AppColors.backgroundLight,
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 60, 20, 20),
                    child: Row(
                      children: [
                        Container(
                          width: 56,
                          height: 56,
                          decoration: BoxDecoration(
                            gradient: subjectGradient,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: subjectColor.withValues(alpha: 0.3),
                                blurRadius: 16,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              subject.icon,
                              style: const TextStyle(fontSize: 28),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                subject.name,
                                style: AppTypography.headlineMedium,
                              ),
                              const SizedBox(height: 4),
                              Text(
                                subject.subtitle,
                                style: AppTypography.bodySmall,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Progress section with gradient
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppTheme.screenPadding),
              child: _buildProgressCard(subject, subjectGradient),
            ),
          ),

          // Mind Map or List View
          if (_showMindMap)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                    horizontal: AppTheme.screenPadding),
                child: _buildMindMapSection(subject, rootTopics, subjectGradient),
              ),
            )
          else
            SliverPadding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.screenPadding),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    return _buildTopicTreeItem(
                        rootTopics[index], rootTopics[index], 0, subjectGradient);
                  },
                  childCount: rootTopics.length,
                ),
              ),
            ),

          const SliverToBoxAdapter(child: SizedBox(height: 100)),
        ],
      ),
    );
  }

  Widget _buildViewToggle({
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
    required LinearGradient gradient,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          gradient: isSelected ? gradient : null,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(
          icon,
          size: 20,
          color: isSelected ? Colors.white : AppColors.textSecondary,
        ),
      ),
    );
  }

  Widget _buildProgressCard(Subject subject, LinearGradient gradient) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppColors.getSoftShadow(),
        border: Border.all(color: AppColors.border),
      ),
      padding: const EdgeInsets.all(20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${subject.completedTopics} of ${subject.totalTopics} topics',
                style: AppTypography.titleMedium,
              ),
              const SizedBox(height: 4),
              Text(
                'completed',
                style: AppTypography.bodySmall,
              ),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              gradient: gradient,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: gradient.colors.first.withValues(alpha: 0.3),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Text(
              '${subject.progressPercentage.toStringAsFixed(0)}%',
              style: AppTypography.statsSmall.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMindMapSection(Subject subject, List<Topic> rootTopics, LinearGradient gradient) {
    if (rootTopics.isEmpty) {
      return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                gradient: gradient,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.account_tree, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            Text(
              'Mind Map',
              style: AppTypography.titleMedium,
            ),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          'Tap to expand • Tap leaf to open',
          style: AppTypography.bodySmall,
        ),
        const SizedBox(height: 16),
        Container(
          decoration: BoxDecoration(
            color: AppColors.cardLight,
            borderRadius: BorderRadius.circular(20),
            boxShadow: AppColors.getSoftShadow(),
          ),
          padding: const EdgeInsets.all(16),
          child: MindMapView(
            rootTopic: rootTopics.first,
            allTopics: _subjectRepo.getTopicsBySubject(widget.subjectId),
            accentColor: gradient.colors.first,
            onNodeTap: (topic) {
              if (topic.isLeaf) {
                context.push(
                    '/learn/${widget.subjectId}/topic/${topic.id}');
              }
            },
            onNodeExpand: (topic) {
              HapticFeedback.lightImpact();
            },
          ),
        ),
      ],
    );
  }

  Widget _buildTopicTreeItem(Topic rootTopic, Topic topic, int depth, LinearGradient gradient) {
    final children = _subjectRepo.getChildTopics(topic.id);
    final isExpanded = _expandedNodes.contains(topic.id);
    final hasChildren = children.isNotEmpty;
    final isRoot = depth == 0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () {
            HapticFeedback.lightImpact();
            if (hasChildren) {
              setState(() {
                if (isExpanded) {
                  _expandedNodes.remove(topic.id);
                } else {
                  _expandedNodes.add(topic.id);
                }
              });
            } else if (topic.isLeaf) {
              context.push('/learn/${widget.subjectId}/topic/${topic.id}');
            }
          },
          child: Container(
            margin: EdgeInsets.only(
              left: isRoot ? 0 : depth * 20.0,
              bottom: 8,
            ),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.cardLight,
              borderRadius: BorderRadius.circular(14),
              boxShadow: AppColors.getSoftShadow(),
              border: Border.all(
                color: topic.status == MasteryStatus.mastered
                    ? gradient.colors.first.withValues(alpha: 0.4)
                    : AppColors.border,
              ),
            ),
            child: Row(
              children: [
                // Expand icon
                if (hasChildren)
                  Icon(
                    isExpanded ? Icons.expand_more : Icons.chevron_right,
                    color: AppColors.textSecondary,
                    size: 20,
                  )
                else
                  const SizedBox(width: 20),

                const SizedBox(width: 12),

                // Status icon
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: _getStatusColor(topic.status, gradient.colors.first).withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      topic.status.icon,
                      style: const TextStyle(fontSize: 14),
                    ),
                  ),
                ),

                const SizedBox(width: 12),

                // Title
                Expanded(
                  child: Text(
                    topic.title,
                    style: AppTypography.titleSmall.copyWith(
                      fontWeight: topic.isLeaf ? FontWeight.w400 : FontWeight.w600,
                    ),
                  ),
                ),

                // Progress or arrow
                if (topic.isLeaf && topic.completionPercentage > 0)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      gradient: gradient,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '${topic.completionPercentage.toInt()}%',
                      style: AppTypography.labelSmall.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  )
                else if (topic.isLeaf)
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppColors.cardElevated,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.arrow_forward_ios,
                      size: 12,
                      color: AppColors.textMuted,
                    ),
                  ),
              ],
            ),
          ),
        ),

        // Children
        if (isExpanded && hasChildren)
          ...children.map((child) => _buildTopicTreeItem(rootTopic, child, depth + 1, gradient)),
      ],
    );
  }

  Color _getStatusColor(MasteryStatus status, Color subjectColor) {
    switch (status) {
      case MasteryStatus.mastered:
        return subjectColor;
      case MasteryStatus.inProgress:
        return AppColors.accentAmber;
      default:
        return AppColors.textMuted;
    }
  }
}
