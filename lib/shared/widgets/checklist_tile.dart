import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/checklist_item.dart';

/// Checklist tile widget - Beautiful Design
class ChecklistTile extends StatefulWidget {
  final ChecklistItem item;
  final ValueChanged<bool>? onChanged;
  final VoidCallback? onDelete;

  const ChecklistTile({
    super.key,
    required this.item,
    this.onChanged,
    this.onDelete,
  });

  @override
  State<ChecklistTile> createState() => _ChecklistTileState();
}

class _ChecklistTileState extends State<ChecklistTile>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _checkAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: AppTheme.animMicro,
      vsync: this,
    );

    _scaleAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.9), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 0.9, end: 1.05), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 1.05, end: 1.0), weight: 1),
    ]).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));

    _checkAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0, 0.5, curve: Curves.easeOut),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTap() {
    HapticFeedback.lightImpact();
    _controller.forward(from: 0);
    widget.onChanged?.call(!widget.item.isChecked);
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: AppColors.cardLight,
          borderRadius: BorderRadius.circular(14),
          boxShadow: AppColors.getSoftShadow(),
          border: Border.all(
            color: widget.item.isChecked
                ? AppColors.accentSuccess.withValues(alpha: 0.3)
                : AppColors.border,
          ),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: _handleTap,
            borderRadius: BorderRadius.circular(14),
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 14,
              ),
              child: Row(
                children: [
                  // Beautiful Checkbox
                  _buildCheckbox(),
                  const SizedBox(width: 14),

                  // Title
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.item.title,
                          style: AppTypography.body.copyWith(
                            color: widget.item.isChecked
                                ? AppColors.textSecondary
                                : AppColors.textPrimary,
                            decoration: widget.item.isChecked
                                ? TextDecoration.lineThrough
                                : null,
                          ),
                        ),
                        if (widget.item.checkedAt != null) ...[
                          const SizedBox(height: 4),
                          Text(
                            _formatTime(widget.item.checkedAt!),
                            style: AppTypography.caption.copyWith(
                              color: AppColors.textMuted,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),

                  // Delete button
                  if (widget.onDelete != null)
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.cardElevated,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        icon: Icon(
                          Icons.close,
                          size: 18,
                          color: AppColors.textMuted,
                        ),
                        onPressed: widget.onDelete,
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCheckbox() {
    return AnimatedContainer(
      duration: AppTheme.animMicro,
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        gradient: widget.item.isChecked
            ? const LinearGradient(
                colors: [AppColors.accentEmerald, AppColors.accentCyan],
              )
            : null,
        color: widget.item.isChecked ? null : AppColors.cardLight,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.item.isChecked
              ? Colors.transparent
              : AppColors.border,
          width: 2,
        ),
        boxShadow: widget.item.isChecked
            ? [
                BoxShadow(
                  color: AppColors.accentEmerald.withValues(alpha: 0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ]
            : null,
      ),
      child: widget.item.isChecked
          ? AnimatedBuilder(
              animation: _checkAnimation,
              builder: (context, child) {
                return Opacity(
                  opacity: _checkAnimation.value,
                  child: const Icon(
                    Icons.check,
                    size: 18,
                    color: Colors.white,
                  ),
                );
              },
            )
          : null,
    );
  }

  String _formatTime(DateTime time) {
    final now = DateTime.now();
    final diff = now.difference(time);

    if (diff.inMinutes < 1) {
      return 'Just now';
    } else if (diff.inHours < 1) {
      return '${diff.inMinutes}m ago';
    } else if (diff.inDays < 1) {
      return '${diff.inHours}h ago';
    } else {
      return '${diff.inDays}d ago';
    }
  }
}
