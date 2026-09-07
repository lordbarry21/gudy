import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/models/topic.dart';
import '../../../data/models/mastery_status.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../shared/widgets/progress_bar.dart';

/// Subject Detail Screen - Tree View
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

class _SubjectDetailScreenState extends ConsumerState<SubjectDetailScreen> {
  final _subjectRepo = SubjectRepository();
  final Set<String> _expandedNodes = {};

  @override
  void initState() {
    super.initState();
    // Initially expand root nodes
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

    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryBackground,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: Row(
          children: [
            Text(subject.icon, style: const TextStyle(fontSize: 24)),
            const SizedBox(width: AppTheme.spacingSm),
            Text(subject.name, style: AppTypography.heading4),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Progress header
          Container(
            padding: const EdgeInsets.all(AppTheme.screenPadding),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${subject.completedTopics}/${subject.totalTopics} topics',
                      style: AppTypography.body,
                    ),
                    Text(
                      '${subject.progressPercentage.toStringAsFixed(0)}%',
                      style: AppTypography.stats.copyWith(
                        color: subject.color,
                        fontSize: 20,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppTheme.spacingSm),
                ProgressBar(
                  percentage: subject.progressPercentage,
                  height: 8,
                  fillColor: subject.color,
                ),
              ],
            ),
          ),

          const Divider(height: 1),

          // Tree view
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(AppTheme.screenPadding),
              itemCount: rootTopics.length,
              itemBuilder: (context, index) {
                return _buildTopicTree(rootTopics[index]);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopicTree(Topic topic) {
    final children = _subjectRepo.getChildTopics(topic.id);
    final isExpanded = _expandedNodes.contains(topic.id);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Topic node
        _TopicNodeWidget(
          topic: topic,
          children: children,
          isExpanded: isExpanded,
          onToggleExpand: () {
            setState(() {
              if (isExpanded) {
                _expandedNodes.remove(topic.id);
              } else {
                _expandedNodes.add(topic.id);
              }
            });
          },
          onTap: topic.isLeaf
              ? () => context.push('/learn/${widget.subjectId}/topic/${topic.id}')
              : null,
        ),

        // Children
        if (isExpanded && children.isNotEmpty)
          AnimatedSize(
            duration: AppTheme.animMicro,
            child: Column(
              children: children
                  .map((child) => _buildChildTopicTree(child, 1))
                  .toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildChildTopicTree(Topic topic, int depth) {
    final children = _subjectRepo.getChildTopics(topic.id);
    final isExpanded = _expandedNodes.contains(topic.id);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(left: depth * 24.0),
          child: _TopicNodeWidget(
            topic: topic,
            children: children,
            isExpanded: isExpanded,
            depth: depth,
            onToggleExpand: () {
              setState(() {
                if (isExpanded) {
                  _expandedNodes.remove(topic.id);
                } else {
                  _expandedNodes.add(topic.id);
                }
              });
            },
            onTap: topic.isLeaf
                ? () =>
                    context.push('/learn/${widget.subjectId}/topic/${topic.id}')
                : null,
          ),
        ),

        // Children
        if (isExpanded && children.isNotEmpty)
          AnimatedSize(
            duration: AppTheme.animMicro,
            child: Column(
              children: children
                  .map((child) => _buildChildTopicTree(child, depth + 1))
                  .toList(),
            ),
          ),
      ],
    );
  }
}

/// Topic Node Widget
class _TopicNodeWidget extends StatelessWidget {
  final Topic topic;
  final List<Topic> children;
  final bool isExpanded;
  final int depth;
  final VoidCallback? onToggleExpand;
  final VoidCallback? onTap;

  const _TopicNodeWidget({
    required this.topic,
    required this.children,
    required this.isExpanded,
    this.depth = 0,
    this.onToggleExpand,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hasChildren = children.isNotEmpty;
    final statusColor = Color(topic.status.colorValue);

    return Padding(
      padding: const EdgeInsets.only(bottom: AppTheme.spacingXs),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: hasChildren ? onToggleExpand : onTap,
          borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
          child: AnimatedContainer(
            duration: AppTheme.animMicro,
            padding: const EdgeInsets.symmetric(
              horizontal: AppTheme.spacingMd,
              vertical: AppTheme.spacingSm,
            ),
            decoration: BoxDecoration(
              color: _getBackgroundColor(),
              borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
              border: Border.all(
                color: topic.status == MasteryStatus.mastered
                    ? statusColor.withOpacity(0.3)
                    : AppColors.border,
              ),
            ),
            child: Row(
              children: [
                // Expand icon
                if (hasChildren)
                  AnimatedRotation(
                    turns: isExpanded ? 0.25 : 0,
                    duration: AppTheme.animMicro,
                    child: const Icon(
                      Icons.chevron_right,
                      size: 20,
                      color: AppColors.textSecondary,
                    ),
                  )
                else
                  const SizedBox(width: 20),

                const SizedBox(width: AppTheme.spacingSm),

                // Status indicator
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      topic.status.icon,
                      style: const TextStyle(fontSize: 14),
                    ),
                  ),
                ),

                const SizedBox(width: AppTheme.spacingSm),

                // Title
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        topic.title,
                        style: AppTypography.body.copyWith(
                          color: _getTextColor(),
                          fontWeight:
                              topic.isLeaf ? FontWeight.w400 : FontWeight.w600,
                        ),
                      ),
                      if (topic.description != null &&
                          topic.description!.isNotEmpty) ...[
                        const SizedBox(height: 2),
                        Text(
                          topic.description!,
                          style: AppTypography.caption,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ],
                  ),
                ),

                // Progress for leaf nodes
                if (topic.isLeaf && topic.completionPercentage > 0) ...[
                  const SizedBox(width: AppTheme.spacingSm),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '${topic.completionPercentage.toInt()}%',
                      style: AppTypography.caption.copyWith(
                        color: statusColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],

                // Arrow for leaf nodes
                if (topic.isLeaf) ...[
                  const SizedBox(width: AppTheme.spacingSm),
                  const Icon(
                    Icons.arrow_forward_ios,
                    size: 14,
                    color: AppColors.textTertiary,
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Color _getBackgroundColor() {
    if (!topic.isLeaf) return Colors.transparent;

    switch (topic.status) {
      case MasteryStatus.mastered:
        return AppColors.masteryGreenLight;
      case MasteryStatus.inProgress:
        return AppColors.accentWarning.withOpacity(0.08);
      default:
        return Colors.transparent;
    }
  }

  Color _getTextColor() {
    switch (topic.status) {
      case MasteryStatus.mastered:
        return AppColors.accentSuccess;
      case MasteryStatus.inProgress:
        return AppColors.accentWarning;
      default:
        return AppColors.textPrimary;
    }
  }
}
