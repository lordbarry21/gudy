import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/topic.dart';
import '../../data/models/mastery_status.dart';

/// Tree node widget for expandable topic branches
class TreeNode extends StatefulWidget {
  final Topic topic;
  final List<Topic> children;
  final int depth;
  final bool isExpanded;
  final VoidCallback? onTap;
  final VoidCallback? onToggleExpand;
  final Widget? trailing;

  const TreeNode({
    super.key,
    required this.topic,
    this.children = const [],
    this.depth = 0,
    this.isExpanded = false,
    this.onTap,
    this.onToggleExpand,
    this.trailing,
  });

  @override
  State<TreeNode> createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _rotationAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: AppTheme.animMicro,
      vsync: this,
      value: widget.isExpanded ? 1.0 : 0.0,
    );
    _rotationAnimation = Tween<double>(begin: 0, end: 0.25).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );
  }

  @override
  void didUpdateWidget(TreeNode oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isExpanded != oldWidget.isExpanded) {
      if (widget.isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final hasChildren = widget.children.isNotEmpty;
    final indentation = widget.depth * 24.0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Node item
        InkWell(
          onTap: hasChildren ? widget.onToggleExpand : widget.onTap,
          borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
          child: AnimatedContainer(
            duration: AppTheme.animMicro,
            padding: EdgeInsets.only(
              left: AppTheme.spacingMd + indentation,
              right: AppTheme.spacingMd,
              top: AppTheme.spacingSm,
              bottom: AppTheme.spacingSm,
            ),
            decoration: BoxDecoration(
              color: _getBackgroundColor(),
              borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
            ),
            child: Row(
              children: [
                // Expand/collapse icon
                if (hasChildren)
                  RotationTransition(
                    turns: _rotationAnimation,
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
                _buildStatusIndicator(),

                const SizedBox(width: AppTheme.spacingSm),

                // Title
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.topic.title,
                        style: AppTypography.body.copyWith(
                          color: _getTextColor(),
                          fontWeight: widget.topic.isLeaf
                              ? FontWeight.w400
                              : FontWeight.w600,
                        ),
                      ),
                      if (widget.topic.description != null &&
                          widget.topic.description!.isNotEmpty) ...[
                        const SizedBox(height: 2),
                        Text(
                          widget.topic.description!,
                          style: AppTypography.caption,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ],
                  ),
                ),

                // Progress indicator for leaf nodes
                if (widget.topic.isLeaf) ...[
                  const SizedBox(width: AppTheme.spacingSm),
                  _buildProgressIndicator(),
                ],

                // Trailing widget
                if (widget.trailing != null) widget.trailing!,
              ],
            ),
          ),
        ),

        // Children (if expanded)
        if (widget.isExpanded && hasChildren)
          AnimatedSize(
            duration: AppTheme.animMicro,
            curve: Curves.easeOut,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: widget.children
                  .map((child) => _buildChildNode(child, widget.depth + 1))
                  .toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildChildNode(Topic child, int depth) {
    // This is a simplified version - in real app, you'd use a TreeView widget
    return TreeNode(
      topic: child,
      depth: depth,
      onTap: widget.onTap,
    );
  }

  Color _getBackgroundColor() {
    if (!widget.topic.isLeaf) {
      return Colors.transparent;
    }

    switch (widget.topic.status) {
      case MasteryStatus.mastered:
        return AppColors.masteryGreenLight;
      case MasteryStatus.inProgress:
        return AppColors.accentWarning.withOpacity(0.1);
      default:
        return Colors.transparent;
    }
  }

  Color _getTextColor() {
    switch (widget.topic.status) {
      case MasteryStatus.mastered:
        return AppColors.accentSuccess;
      case MasteryStatus.inProgress:
        return AppColors.accentWarning;
      default:
        return AppColors.textPrimary;
    }
  }

  Widget _buildStatusIndicator() {
    final color = Color(widget.topic.status.colorValue);
    final icon = widget.topic.status.icon;

    return Container(
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Text(
          icon,
          style: const TextStyle(fontSize: 12),
        ),
      ),
    );
  }

  Widget _buildProgressIndicator() {
    final percentage = widget.topic.completionPercentage;

    if (percentage == 0) {
      return const SizedBox(width: 32);
    }

    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        shape: BoxShape.circle,
        border: Border.all(color: AppColors.border),
      ),
      child: Center(
        child: Text(
          '${percentage.toInt()}%',
          style: AppTypography.caption.copyWith(
            fontWeight: FontWeight.w600,
            fontSize: 10,
          ),
        ),
      ),
    );
  }
}
