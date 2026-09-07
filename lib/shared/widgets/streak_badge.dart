import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_theme.dart';

/// Streak badge widget with fire animation
class StreakBadge extends StatefulWidget {
  final int streak;
  final bool showLabel;
  final double size;

  const StreakBadge({
    super.key,
    required this.streak,
    this.showLabel = true,
    this.size = 48,
  });

  @override
  State<StreakBadge> createState() => _StreakBadgeState();
}

class _StreakBadgeState extends State<StreakBadge>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _animation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppTheme.spacingMd,
        vertical: AppTheme.spacingSm,
      ),
      decoration: BoxDecoration(
        gradient: widget.streak > 0 ? AppColors.fireGradient : null,
        color: widget.streak > 0 ? null : AppColors.cardBackground,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: widget.streak > 0
              ? AppColors.streakFire.withOpacity(0.5)
              : AppColors.border,
          width: 1.5,
        ),
        boxShadow: widget.streak > 0
            ? [
                BoxShadow(
                  color: AppColors.streakFire.withOpacity(0.3),
                  blurRadius: 12,
                  spreadRadius: 0,
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Opacity(
                opacity: widget.streak > 0 ? _animation.value : 0.5,
                child: Text(
                  '🔥',
                  style: TextStyle(fontSize: widget.size * 0.5),
                ),
              );
            },
          ),
          const SizedBox(width: AppTheme.spacingSm),
          Text(
            '${widget.streak}',
            style: AppTypography.streakNumber.copyWith(
              color: widget.streak > 0
                  ? AppColors.textPrimary
                  : AppColors.textSecondary,
            ),
          ),
          if (widget.showLabel) ...[
            const SizedBox(width: AppTheme.spacingXs),
            Text(
              'day streak',
              style: AppTypography.bodySmall.copyWith(
                color: widget.streak > 0
                    ? AppColors.textPrimary.withOpacity(0.8)
                    : AppColors.textTertiary,
                fontSize: 12,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Compact streak badge for cards
class StreakBadgeCompact extends StatelessWidget {
  final int streak;

  const StreakBadgeCompact({
    super.key,
    required this.streak,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppTheme.spacingSm,
        vertical: AppTheme.spacingXs,
      ),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('🔥', style: const TextStyle(fontSize: 14)),
          const SizedBox(width: 4),
          Text(
            '$streak',
            style: AppTypography.label.copyWith(
              color: AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
