import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../data/models/topic.dart';
import '../../../data/models/mastery_status.dart';

/// MindMap Node Model
class MindMapNode {
  final Topic topic;
  final List<MindMapNode> children;
  bool isExpanded;

  MindMapNode({
    required this.topic,
    this.children = const [],
    this.isExpanded = false,
  });
}

/// MindMap Visualization Widget - Wrap Layout
class MindMapView extends StatefulWidget {
  final Topic rootTopic;
  final List<Topic> allTopics;
  final Function(Topic)? onNodeTap;
  final Function(Topic)? onNodeExpand;
  final Color? accentColor;

  const MindMapView({
    super.key,
    required this.rootTopic,
    required this.allTopics,
    this.onNodeTap,
    this.onNodeExpand,
    this.accentColor,
  });

  @override
  State<MindMapView> createState() => _MindMapViewState();
}

class _MindMapViewState extends State<MindMapView>
    with SingleTickerProviderStateMixin {
  final Map<String, MindMapNode> _nodeMap = {};
  final Set<String> _expandedNodes = {};
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    );
    _animationController.forward();
    _buildNodeTree();
    _expandedNodes.add(widget.rootTopic.id);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _buildNodeTree() {
    for (final topic in widget.allTopics) {
      _nodeMap[topic.id] = MindMapNode(topic: topic);
    }

    for (final topic in widget.allTopics) {
      if (topic.parentId != null && _nodeMap.containsKey(topic.parentId)) {
        _nodeMap[topic.parentId]!.children.add(_nodeMap[topic.id]!);
      }
    }
  }

  void _toggleExpand(String nodeId) {
    setState(() {
      if (_expandedNodes.contains(nodeId)) {
        _expandedNodes.remove(nodeId);
      } else {
        _expandedNodes.add(nodeId);
      }
      _nodeMap[nodeId]!.isExpanded = _expandedNodes.contains(nodeId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        final rootNode = _nodeMap[widget.rootTopic.id];
        if (rootNode == null) return const SizedBox();

        return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: SingleChildScrollView(
            child: Column(
              children: [
                // Root node
                _buildRootNode(rootNode),
                const SizedBox(height: 16),
                // Connection line
                if (_expandedNodes.contains(rootNode.topic.id))
                  _buildConnectionLine(),
                const SizedBox(height: 16),
                // Children row
                if (_expandedNodes.contains(rootNode.topic.id))
                  _buildChildrenRow(rootNode.children),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRootNode(MindMapNode node) {
    final color = _getNodeColor(node.topic.status);
    return GestureDetector(
      onTap: () {
        _toggleExpand(node.topic.id);
        widget.onNodeExpand?.call(node.topic);
      },
      child: Container(
        width: 64,
        height: 64,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: color,
          boxShadow: [
            BoxShadow(
              color: color.withValues(alpha: 0.4),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Icon(Icons.folder, color: Colors.white, size: 32),
      ),
    );
  }

  Widget _buildConnectionLine() {
    return Container(
      width: 2,
      height: 24,
      decoration: BoxDecoration(
        color: AppColors.textMuted.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(1),
      ),
    );
  }

  Widget _buildChildrenRow(List<MindMapNode> children) {
    if (children.isEmpty) return const SizedBox();

    return Wrap(
      spacing: 12,
      runSpacing: 12,
      alignment: WrapAlignment.center,
      children: children.map((child) => _buildChildNode(child)).toList(),
    );
  }

  Widget _buildChildNode(MindMapNode node) {
    final status = node.topic.status;
    final hasChildren = node.children.isNotEmpty;
    final color = _getNodeColor(status);

    return GestureDetector(
      onTap: () {
        if (hasChildren) {
          _toggleExpand(node.topic.id);
          widget.onNodeExpand?.call(node.topic);
        } else {
          widget.onNodeTap?.call(node.topic);
        }
      },
      child: Tooltip(
        message: node.topic.title,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color.withValues(alpha: 0.15),
                border: Border.all(color: color, width: 2),
              ),
              child: Center(
                child: hasChildren
                    ? Icon(Icons.expand_more, color: color, size: 24)
                    : Icon(Icons.chevron_right, color: color, size: 24),
              ),
            ),
            const SizedBox(height: 4),
            SizedBox(
              width: 70,
              child: Text(
                node.topic.title,
                style: TextStyle(
                  color: color,
                  fontSize: 9,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getNodeColor(MasteryStatus status) {
    switch (status) {
      case MasteryStatus.mastered:
        return widget.accentColor ?? AppColors.accentCyan;
      case MasteryStatus.inProgress:
        return AppColors.accentAmber;
      default:
        return AppColors.textMuted;
    }
  }
}
