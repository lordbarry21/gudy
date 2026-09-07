import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/checklist_item.dart';

/// Checklist tile widget with animation
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
      child: InkWell(
        onTap: _handleTap,
        borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppTheme.spacingMd,
            vertical: AppTheme.spacingSm,
          ),
          child: Row(
            children: [
              // Checkbox
              _buildCheckbox(),
              const SizedBox(width: AppTheme.spacingMd),

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
                      const SizedBox(height: 2),
                      Text(
                        _formatTime(widget.item.checkedAt!),
                        style: AppTypography.caption.copyWith(
                          color: AppColors.textTertiary,
                        ),
                      ),
                    ],
                  ],
                ),
              ),

              // Delete button
              if (widget.onDelete != null)
                IconButton(
                  icon: const Icon(
                    Icons.close,
                    size: 18,
                    color: AppColors.textTertiary,
                  ),
                  onPressed: widget.onDelete,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCheckbox() {
    return AnimatedContainer(
      duration: AppTheme.animMicro,
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        color: widget.item.isChecked
            ? AppColors.accentSuccess
            : AppColors.cardBackground,
        borderRadius: BorderRadius.circular(6),
        border: Border.all(
          color: widget.item.isChecked
              ? AppColors.accentSuccess
              : AppColors.border,
          width: 2,
        ),
      ),
      child: widget.item.isChecked
          ? AnimatedBuilder(
              animation: _checkAnimation,
              builder: (context, child) {
                return Opacity(
                  opacity: _checkAnimation.value,
                  child: const Icon(
                    Icons.check,
                    size: 16,
                    color: AppColors.primaryBackground,
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
