import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';

/// Beautiful Streak Badge - Gradient Design
class StreakBadge extends StatefulWidget {
  final int streak;
  final bool showLabel;
  final double size;
  final bool isLarge;

  const StreakBadge({
    super.key,
    required this.streak,
    this.showLabel = true,
    this.size = 48,
    this.isLarge = false,
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

    _animation = Tween<double>(begin: 0.9, end: 1.0).animate(
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
    final hasStreak = widget.streak > 0;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: widget.isLarge ? 20 : 16,
        vertical: widget.isLarge ? 16 : 12,
      ),
      decoration: BoxDecoration(
        gradient: hasStreak
            ? const LinearGradient(
                colors: [Color(0xFFFB923C), Color(0xFFF472B6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : null,
        color: hasStreak ? null : AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: hasStreak
            ? [
                BoxShadow(
                  color: AppColors.accentOrange.withValues(alpha: 0.3),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ]
            : AppColors.getSoftShadow(),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Fire icon with animation
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Transform.scale(
                scale: hasStreak ? _animation.value : 0.85,
                child: Container(
                  width: widget.isLarge ? 48 : 36,
                  height: widget.isLarge ? 48 : 36,
                  decoration: BoxDecoration(
                    color: hasStreak
                        ? Colors.white.withValues(alpha: 0.2)
                        : AppColors.cardElevated,
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      '🔥',
                      style: TextStyle(
                        fontSize: widget.isLarge ? 24 : 18,
                        color: hasStreak ? null : Colors.grey,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
          SizedBox(width: widget.isLarge ? 16 : 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '${widget.streak}',
                    style: AppTypography.statsSmall.copyWith(
                      color: hasStreak ? Colors.white : AppColors.textSecondary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  if (widget.showLabel) ...[
                    const SizedBox(width: 4),
                    Text(
                      'days',
                      style: AppTypography.bodyMedium.copyWith(
                        color: hasStreak
                            ? Colors.white.withValues(alpha: 0.9)
                            : AppColors.textSecondary,
                      ),
                    ),
                  ],
                ],
              ),
              if (widget.showLabel && widget.isLarge) ...[
                const SizedBox(height: 4),
                Text(
                  hasStreak ? 'Keep it up!' : 'Start today',
                  style: AppTypography.bodySmall.copyWith(
                    color: hasStreak
                        ? Colors.white.withValues(alpha: 0.8)
                        : AppColors.textMuted,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}

/// Compact streak badge - Modern design
class StreakBadgeCompact extends StatelessWidget {
  final int streak;

  const StreakBadgeCompact({
    super.key,
    required this.streak,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        gradient: streak > 0
            ? const LinearGradient(
                colors: [Color(0xFFFB923C), Color(0xFFF472B6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : null,
        color: streak > 0 ? null : AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: streak > 0
            ? [
                BoxShadow(
                  color: AppColors.accentOrange.withValues(alpha: 0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ]
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            '🔥',
            style: TextStyle(
              fontSize: 14,
              color: streak > 0 ? null : Colors.grey,
            ),
          ),
          const SizedBox(width: 4),
          Text(
            '$streak',
            style: AppTypography.labelMedium.copyWith(
              fontWeight: FontWeight.w700,
              color: streak > 0 ? Colors.white : AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
