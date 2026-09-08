import 'package:flutter/material.dart';

/// Gudy App Color System - VIBRANT NEON Design
/// Exciting gradient-based design with glowing effects and neon accents
class AppColors {
  AppColors._();

  // ============================================
  // BACKGROUND COLORS - Dark mode feel with vibrancy
  // ============================================

  /// Clean white background
  static const Color backgroundLight = Color(0xFFFFFFFF);

  /// Subtle off-white for cards
  static const Color surfaceLight = Color(0xFFF8FAFC);

  /// Card background
  static const Color cardLight = Color(0xFFFFFFFF);

  /// Elevated surface (slightly grey)
  static const Color cardElevated = Color(0xFFF1F5F9);

  /// Subtle border
  static const Color border = Color(0xFFE2E8F0);
  static const Color borderLight = Color(0xFFF1F5F9);

  // ============================================
  // NEON GRADIENT BACKGROUNDS - Exciting & Vibrant
  // ============================================

  /// Main app gradient (ELECTRIC PURPLE to HOT PINK)
  static const LinearGradient mainGradient = LinearGradient(
    colors: [Color(0xFFA855F7), Color(0xFFEC4899)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Electric purple gradient
  static const LinearGradient electricPurpleGradient = LinearGradient(
    colors: [Color(0xFF9333EA), Color(0xFFA855F7)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Ocean cyan gradient (ELECTRIC BLUE)
  static const LinearGradient oceanGradient = LinearGradient(
    colors: [Color(0xFF06B6D4), Color(0xFF3B82F6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Sunset gradient (NEON ORANGE to HOT PINK)
  static const LinearGradient sunsetGradient = LinearGradient(
    colors: [Color(0xFFFF6B35), Color(0xFFFF0080)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Fresh mint gradient (NEON GREEN)
  static const LinearGradient mintGradient = LinearGradient(
    colors: [Color(0xFF10B981), Color(0xFF06B6D4)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Sunrise gradient (GOLDEN)
  static const LinearGradient sunriseGradient = LinearGradient(
    colors: [Color(0xFFFBBF24), Color(0xFFF97316)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Rainbow gradient for celebrations
  static const LinearGradient rainbowGradient = LinearGradient(
    colors: [Color(0xFFFF0080), Color(0xFF7928CA), Color(0xFF4F46E5), Color(0xFF06B6D4)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Header gradient for screens (more vibrant)
  static const LinearGradient headerGradient = LinearGradient(
    colors: [Color(0xFFA855F7), Color(0xFF6366F1)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Neon glow header gradient
  static const LinearGradient neonGlowGradient = LinearGradient(
    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899), Color(0xFFFF6B6B)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Subtle background gradient
  static const LinearGradient backgroundGradient = LinearGradient(
    colors: [Color(0xFFF8FAFC), Color(0xFFFFFFFF)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  // ============================================
  // TEXT COLORS - Enhanced contrast
  // ============================================

  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textMuted = Color(0xFF94A3B8);
  static const Color textDisabled = Color(0xFFCBD5E1);

  // ============================================
  // NEON ACCENT COLORS - Extra Vibrant
  // ============================================

  /// Electric Purple (more vivid)
  static const Color accentPurple = Color(0xFFA855F7);
  static const Color accentPurpleDark = Color(0xFF9333EA);

  /// Hot Pink (neon)
  static const Color accentPink = Color(0xFFEC4899);
  static const Color accentPinkBright = Color(0xFFFF0080);

  /// Electric Cyan
  static const Color accentCyan = Color(0xFF06B6D4);
  static const Color accentCyanBright = Color(0xFF22D3EE);

  /// Vivid Blue
  static const Color accentBlue = Color(0xFF3B82F6);
  static const Color accentBlueBright = Color(0xFF60A5FA);

  /// Neon Green
  static const Color accentEmerald = Color(0xFF10B981);
  static const Color accentEmeraldBright = Color(0xFF34D399);

  /// Neon Orange
  static const Color accentOrange = Color(0xFFFB923C);
  static const Color accentOrangeBright = Color(0xFFFF6B35);

  /// Golden Yellow
  static const Color accentAmber = Color(0xFFFBBF24);
  static const Color accentAmberBright = Color(0xFFFCD34D);

  /// Hot Red
  static const Color accentRose = Color(0xFFF43F5E);
  static const Color accentRoseBright = Color(0xFFFF6B6B);

  // Aliases for compatibility
  static const Color accentSuccess = accentEmerald;
  static const Color cardBackground = cardLight;
  static const Color primaryBackground = backgroundLight;
  static const Color primaryGradientStart = accentPurple;
  static const Color primaryGradientEnd = accentPink;
  static const Color primaryCyan = accentCyan;
  static const Color primaryPurple = accentPurple;
  static const Color primaryBlue = accentBlue;
  static const Color masteryGreenLight = Color(0x1A10B981);

  // ============================================
  // MASTERY COLORS - More vibrant
  // ============================================

  static const Color masteryNotStarted = Color(0xFFCBD5E1);
  static const Color masteryInProgress = Color(0xFFFBBF24);
  static const Color masteryMastered = Color(0xFFA855F7);

  static const Color statusNotStarted = Color(0xFFCBD5E1);
  static const Color statusInProgress = Color(0xFFFBBF24);
  static const Color statusMastered = Color(0xFFA855F7);

  // ============================================
  // NEON SHADOW COLORS - Glowing effects
  // ============================================

  /// Purple glow shadow
  static List<BoxShadow> getShadow(Color color, {double blur = 20, double spread = 0}) {
    return [
      BoxShadow(
        color: color.withValues(alpha: 0.3),
        blurRadius: blur,
        spreadRadius: spread,
        offset: const Offset(0, 4),
      ),
      BoxShadow(
        color: color.withValues(alpha: 0.15),
        blurRadius: blur * 1.5,
        spreadRadius: spread,
        offset: const Offset(0, 8),
      ),
    ];
  }

  /// Neon glow shadow - more intense
  static List<BoxShadow> getNeonGlow(Color color, {double blur = 20, double intensity = 0.4}) {
    return [
      BoxShadow(
        color: color.withValues(alpha: intensity),
        blurRadius: blur,
        spreadRadius: 2,
        offset: const Offset(0, 0),
      ),
      BoxShadow(
        color: color.withValues(alpha: intensity * 0.5),
        blurRadius: blur * 2,
        spreadRadius: 4,
        offset: const Offset(0, 4),
      ),
    ];
  }

  /// Creates a soft shadow
  static List<BoxShadow> getSoftShadow({double blur = 16}) {
    return [
      BoxShadow(
        color: shadowDefault,
        blurRadius: blur,
        spreadRadius: 0,
        offset: const Offset(0, 2),
      ),
      BoxShadow(
        color: const Color(0x05000000),
        blurRadius: blur * 2,
        spreadRadius: 0,
        offset: const Offset(0, 6),
      ),
    ];
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  /// Black at 5% opacity
  static const Color blackMedium = Color(0x0D000000);

  /// Black at 10% opacity
  static const Color blackLight = Color(0x1A000000);

  /// White at 10% opacity
  static const Color whiteMedium = Color(0x1AFFFFFF);

  /// White at 20% opacity
  static const Color whiteLight = Color(0x33FFFFFF);

  // ============================================
  // SUBJECT COLORS - Ultra Vibrant with Neon
  // ============================================

  static const Color subjectMath = Color(0xFF06B6D4);
  static const Color subjectTKA = Color(0xFFA855F7);
  static const Color subjectIndo = Color(0xFFFBBF24);
  static const Color subjectEng = Color(0xFFFF0080);
  static const Color subjectSerkom = Color(0xFF10B981);

  static LinearGradient getSubjectGradient(String subjectId) {
    switch (subjectId) {
      case 'matematika_osn':
        return const LinearGradient(
          colors: [Color(0xFF06B6D4), Color(0xFF0891B2)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'tka_matematika':
        return const LinearGradient(
          colors: [Color(0xFFA855F7), Color(0xFF9333EA)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'bahasa_indonesia':
        return const LinearGradient(
          colors: [Color(0xFFFBBF24), Color(0xFFF97316)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'bahasa_inggris':
        return const LinearGradient(
          colors: [Color(0xFFFF0080), Color(0xFFEC4899)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'serkom':
        return const LinearGradient(
          colors: [Color(0xFF10B981), Color(0xFF059669)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      default:
        return mainGradient;
    }
  }

  /// Get neon shadow for subject
  static List<BoxShadow> getSubjectShadow(String subjectId) {
    switch (subjectId) {
      case 'matematika_osn':
        return getNeonGlow(subjectMath);
      case 'tka_matematika':
        return getNeonGlow(subjectTKA);
      case 'bahasa_indonesia':
        return getNeonGlow(subjectIndo);
      case 'bahasa_inggris':
        return getNeonGlow(subjectEng);
      case 'serkom':
        return getNeonGlow(subjectSerkom);
      default:
        return getNeonGlow(accentPurple);
    }
  }
}
