import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_theme.dart';

/// Animated progress bar widget
class ProgressBar extends StatelessWidget {
  final double percentage;
  final double height;
  final Color? backgroundColor;
  final Color? fillColor;
  final bool showPercentage;
  final bool animate;
  final Duration animationDuration;

  const ProgressBar({
    super.key,
    required this.percentage,
    this.height = 8,
    this.backgroundColor,
    this.fillColor,
    this.showPercentage = false,
    this.animate = true,
    this.animationDuration = const Duration(milliseconds: 300),
  });

  @override
  Widget build(BuildContext context) {
    final clampedPercentage = percentage.clamp(0.0, 100.0);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          height: height,
          decoration: BoxDecoration(
            color: backgroundColor ?? AppColors.border,
            borderRadius: BorderRadius.circular(height / 2),
          ),
          child: Stack(
            children: [
              AnimatedContainer(
                duration: animate ? animationDuration : Duration.zero,
                curve: Curves.easeOut,
                width: double.infinity,
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: clampedPercentage / 100,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: fillColor != null
                          ? LinearGradient(colors: [fillColor!, fillColor!])
                          : const LinearGradient(colors: [AppColors.accentEmerald, AppColors.accentEmerald]),
                      borderRadius: BorderRadius.circular(height / 2),
                      boxShadow: clampedPercentage > 0
                          ? [
                              BoxShadow(
                                color: (fillColor ?? AppColors.accentSuccess)
                                    .withOpacity(0.4),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ]
                          : null,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        if (showPercentage) ...[
          const SizedBox(height: AppTheme.spacingXs),
          Text(
            '${clampedPercentage.toStringAsFixed(0)}%',
            style: AppTypography.caption.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ],
    );
  }
}

/// Circular progress indicator
class CircularProgress extends StatelessWidget {
  final double percentage;
  final double size;
  final double strokeWidth;
  final Color? backgroundColor;
  final Color? progressColor;
  final Widget? child;

  const CircularProgress({
    super.key,
    required this.percentage,
    this.size = 48,
    this.strokeWidth = 4,
    this.backgroundColor,
    this.progressColor,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final clampedPercentage = percentage.clamp(0.0, 100.0);

    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: clampedPercentage / 100),
            duration: const Duration(milliseconds: 500),
            curve: Curves.easeOut,
            builder: (context, value, _) {
              return CustomPaint(
                size: Size(size, size),
                painter: _CircularProgressPainter(
                  progress: value,
                  strokeWidth: strokeWidth,
                  backgroundColor: backgroundColor ?? AppColors.border,
                  progressColor: progressColor ?? AppColors.accentSuccess,
                ),
              );
            },
          ),
          if (child != null) child!,
        ],
      ),
    );
  }
}

class _CircularProgressPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;
  final Color backgroundColor;
  final Color progressColor;

  _CircularProgressPainter({
    required this.progress,
    required this.strokeWidth,
    required this.backgroundColor,
    required this.progressColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    // Background circle
    final backgroundPaint = Paint()
      ..color = backgroundColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, backgroundPaint);

    // Progress arc
    final progressPaint = Paint()
      ..color = progressColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    final sweepAngle = 2 * 3.14159 * progress;
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -3.14159 / 2,
      sweepAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant _CircularProgressPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
