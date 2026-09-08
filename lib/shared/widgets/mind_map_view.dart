import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../data/models/topic.dart';
import '../../../data/models/mastery_status.dart';

/// MindMap Node Model
class MindMapNode {
  final Topic topic;
  final double x;
  final double y;
  final List<MindMapNode> children;
  bool isExpanded;

  MindMapNode({
    required this.topic,
    required this.x,
    required this.y,
    this.children = const [],
    this.isExpanded = false,
  });
}

/// MindMap Visualization Widget - Minimal Design
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
    with TickerProviderStateMixin {
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
      _nodeMap[topic.id] = MindMapNode(
        topic: topic,
        x: 0,
        y: 0,
        isExpanded: _expandedNodes.contains(topic.id),
      );
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
        return CustomPaint(
          painter: MindMapPainter(
            rootNode: _nodeMap[widget.rootTopic.id],
            nodeMap: _nodeMap,
            expandedNodes: _expandedNodes,
            animationValue: _animation.value,
            accentColor: widget.accentColor ?? AppColors.accentCyan,
          ),
          child: _buildInteractiveLayer(),
        );
      },
    );
  }

  Widget _buildInteractiveLayer() {
    final rootNode = _nodeMap[widget.rootTopic.id];
    if (rootNode == null) return const SizedBox.shrink();

    return LayoutBuilder(
      builder: (context, constraints) {
        return Stack(
          children: _buildNodes(rootNode, constraints.maxWidth, constraints.maxHeight),
        );
      },
    );
  }

  List<Widget> _buildNodes(MindMapNode node, double width, double height) {
    final widgets = <Widget>[];
    final centerX = width / 2;
    final centerY = 70.0;

    widgets.add(_buildNodeWidget(node, centerX, centerY, 0));

    if (_expandedNodes.contains(node.topic.id)) {
      final childCount = node.children.length;
      if (childCount > 0) {
        final angleSpread = math.pi / 3;
        final startAngle = -math.pi / 2 - angleSpread / 2;
        final angleStep = angleSpread / (childCount > 1 ? childCount - 1 : 1);
        final radius = 90.0;

        for (var i = 0; i < childCount; i++) {
          final child = node.children[i];
          final angle = childCount > 1
              ? startAngle + (angleStep * i)
              : -math.pi / 2;
          final childX = centerX + radius * math.cos(angle);
          final childY = centerY + radius * math.sin(angle) + centerY;

          widgets.add(_buildNodeWidget(child, childX, childY, 1));
        }
      }
    }

    return widgets;
  }

  Widget _buildNodeWidget(MindMapNode node, double x, double y, int level) {
    final status = node.topic.status;
    final hasChildren = node.children.isNotEmpty;
    final color = _getNodeColor(status);
    final nodeSize = level == 0 ? 70.0 : 54.0;

    return Positioned(
      left: x - nodeSize / 2,
      top: y - nodeSize / 2,
      child: GestureDetector(
        onTap: () {
          if (hasChildren) {
            _toggleExpand(node.topic.id);
            widget.onNodeExpand?.call(node.topic);
          } else {
            widget.onNodeTap?.call(node.topic);
          }
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: nodeSize,
          height: nodeSize,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: level == 0 ? color : color.withValues(alpha: 0.15),
            border: Border.all(
              color: color,
              width: level == 0 ? 2 : 1.5,
            ),
          ),
          child: Center(
            child: level == 0
                ? Text(
                    '\u{1F4DA}',
                    style: TextStyle(fontSize: nodeSize * 0.4),
                  )
                : Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        node.topic.title.length > 6
                            ? '${node.topic.title.substring(0, 6)}'
                            : node.topic.title,
                        style: AppTypography.labelSmall.copyWith(
                          color: color,
                          fontWeight: FontWeight.w600,
                          fontSize: level > 1 ? 8 : 10,
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 1,
                      ),
                      if (hasChildren)
                        Icon(
                          _expandedNodes.contains(node.topic.id)
                              ? Icons.remove
                              : Icons.add,
                          color: color,
                          size: 12,
                        ),
                    ],
                  ),
          ),
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

/// Custom painter for drawing connections
class MindMapPainter extends CustomPainter {
  final MindMapNode? rootNode;
  final Map<String, MindMapNode> nodeMap;
  final Set<String> expandedNodes;
  final double animationValue;
  final Color accentColor;

  MindMapPainter({
    required this.rootNode,
    required this.nodeMap,
    required this.expandedNodes,
    required this.animationValue,
    required this.accentColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (rootNode == null) return;

    final centerX = size.width / 2;
    final centerY = 70.0;

    _drawConnections(
      canvas,
      centerX,
      centerY,
      rootNode!,
      90.0,
      math.pi / 3,
      animationValue,
    );
  }

  void _drawConnections(
    Canvas canvas,
    double parentX,
    double parentY,
    MindMapNode node,
    double radius,
    double angleSpread,
    double animValue,
  ) {
    if (!expandedNodes.contains(node.topic.id)) return;

    final childCount = node.children.length;
    if (childCount == 0) return;

    final startAngle = -math.pi / 2 - angleSpread / 2;
    final angleStep = childCount > 1 ? angleSpread / (childCount - 1) : 0.0;

    for (var i = 0; i < childCount; i++) {
      final child = node.children[i];
      final angle = childCount > 1 ? startAngle + (angleStep * i) : -math.pi / 2;
      final childX = parentX + radius * math.cos(angle);
      final childY = parentY + radius * math.sin(angle) + 70;

      final paint = Paint()
        ..color = _getConnectionColor(child.topic.status).withValues(alpha: 0.5 * animValue)
        ..strokeWidth = 1.5
        ..style = PaintingStyle.stroke;

      final path = Path();
      path.moveTo(parentX, parentY);
      final controlX = (parentX + childX) / 2;
      final controlY = parentY + 35;
      path.quadraticBezierTo(controlX, controlY, childX, childY);

      canvas.drawPath(path, paint);

      _drawConnections(
        canvas,
        childX,
        childY,
        child,
        70.0,
        angleSpread,
        animValue,
      );
    }
  }

  Color _getConnectionColor(MasteryStatus status) {
    switch (status) {
      case MasteryStatus.mastered:
        return accentColor;
      case MasteryStatus.inProgress:
        return AppColors.accentAmber;
      default:
        return AppColors.textMuted;
    }
  }

  @override
  bool shouldRepaint(covariant MindMapPainter oldDelegate) {
    return oldDelegate.animationValue != animationValue ||
        oldDelegate.expandedNodes != expandedNodes;
  }
}
