import 'package:flutter/material.dart';

/// Gudy App Color System - Beautiful Light Mode Design
/// Modern gradient-based design with soft shadows and vibrant accents
class AppColors {
  AppColors._();

  // ============================================
  // BACKGROUND COLORS - Pure Light Mode
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
  // GRADIENT BACKGROUNDS - Beautiful gradients
  // ============================================

  /// Main app gradient (purple to pink)
  static const LinearGradient mainGradient = LinearGradient(
    colors: [Color(0xFF8B5CF6), Color(0xFFEC4899)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Soft purple gradient
  static const LinearGradient softPurpleGradient = LinearGradient(
    colors: [Color(0xFFA78BFA), Color(0xFF8B5CF6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Ocean blue gradient
  static const LinearGradient oceanGradient = LinearGradient(
    colors: [Color(0xFF06B6D4), Color(0xFF3B82F6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Sunset gradient (orange to pink)
  static const LinearGradient sunsetGradient = LinearGradient(
    colors: [Color(0xFFFB923C), Color(0xFFF472B6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Fresh mint gradient
  static const LinearGradient mintGradient = LinearGradient(
    colors: [Color(0xFF34D399), Color(0xFF06B6D4)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Sunrise gradient
  static const LinearGradient sunriseGradient = LinearGradient(
    colors: [Color(0xFFFBBF24), Color(0xFFFB923C)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Header gradient for screens
  static const LinearGradient headerGradient = LinearGradient(
    colors: [Color(0xFF8B5CF6), Color(0xFF6366F1)],
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
  // TEXT COLORS
  // ============================================

  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textMuted = Color(0xFF94A3B8);
  static const Color textDisabled = Color(0xFFCBD5E1);

  // ============================================
  // ACCENT COLORS - Vibrant
  // ============================================

  static const Color accentPurple = Color(0xFF8B5CF6);
  static const Color accentPink = Color(0xFFEC4899);
  static const Color accentCyan = Color(0xFF06B6D4);
  static const Color accentBlue = Color(0xFF3B82F6);
  static const Color accentEmerald = Color(0xFF10B981);
  static const Color accentOrange = Color(0xFFFB923C);
  static const Color accentAmber = Color(0xFFFBBF24);
  static const Color accentRose = Color(0xFFF43F5E);

  // Aliases
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
  // MASTERY COLORS
  // ============================================

  static const Color masteryNotStarted = Color(0xFFCBD5E1);
  static const Color masteryInProgress = Color(0xFFFBBF24);
  static const Color masteryMastered = Color(0xFF8B5CF6);

  static const Color statusNotStarted = Color(0xFFCBD5E1);
  static const Color statusInProgress = Color(0xFFFBBF24);
  static const Color statusMastered = Color(0xFF8B5CF6);

  // ============================================
  // SHADOW COLORS
  // ============================================

  /// Purple tinted shadow
  static const Color shadowPurple = Color(0x208B5CF6);

  /// Pink tinted shadow
  static const Color shadowPink = Color(0x20EC4899);

  /// Cyan tinted shadow
  static const Color shadowCyan = Color(0x2006B6D4);

  /// Default shadow
  static const Color shadowDefault = Color(0x0F000000);

  /// Light shadow for cards
  static const Color shadowLight = Color(0x0A000000);

  /// Creates a colored shadow based on gradient
  static List<BoxShadow> getShadow(Color color, {double blur = 20, double spread = 0}) {
    return [
      BoxShadow(
        color: color.withValues(alpha: 0.15),
        blurRadius: blur,
        spreadRadius: spread,
        offset: const Offset(0, 4),
      ),
      BoxShadow(
        color: color.withValues(alpha: 0.08),
        blurRadius: blur * 1.5,
        spreadRadius: spread,
        offset: const Offset(0, 8),
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
  // SUBJECT COLORS - Vibrant with gradients
  // ============================================

  static const Color subjectMath = Color(0xFF06B6D4);
  static const Color subjectTKA = Color(0xFF8B5CF6);
  static const Color subjectIndo = Color(0xFFFBBF24);
  static const Color subjectEng = Color(0xFFF472B6);
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
          colors: [Color(0xFF8B5CF6), Color(0xFF7C3AED)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'bahasa_indonesia':
        return const LinearGradient(
          colors: [Color(0xFFFBBF24), Color(0xFFF59E0B)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        );
      case 'bahasa_inggris':
        return const LinearGradient(
          colors: [Color(0xFFF472B6), Color(0xFFEC4899)],
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

  /// Get shadow for subject
  static List<BoxShadow> getSubjectShadow(String subjectId) {
    switch (subjectId) {
      case 'matematika_osn':
        return getShadow(subjectMath);
      case 'tka_matematika':
        return getShadow(subjectTKA);
      case 'bahasa_indonesia':
        return getShadow(subjectIndo);
      case 'bahasa_inggris':
        return getShadow(subjectEng);
      case 'serkom':
        return getShadow(subjectSerkom);
      default:
        return getShadow(accentPurple);
    }
  }
}
