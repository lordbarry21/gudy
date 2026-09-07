import 'package:flutter/material.dart';

/// Gudy App Color System
/// Based on 60/30/10 rule: 60% neutral, 30% complementary, 10% accent
class AppColors {
  AppColors._();

  // ============================================
  // BACKGROUND COLORS (60% - Neutral Base)
  // ============================================

  /// Primary background - near black
  static const Color primaryBackground = Color(0xFF0A0A0A);

  /// Secondary background - dark gray
  static const Color secondaryBackground = Color(0xFF1A1A1A);

  /// Card background - elevated surface
  static const Color cardBackground = Color(0xFF242424);

  /// Border/divider color
  static const Color border = Color(0xFF333333);

  /// Tertiary background (hover states)
  static const Color tertiaryBackground = Color(0xFF2A2A2A);

  // ============================================
  // TEXT COLORS
  // ============================================

  /// Primary text - white
  static const Color textPrimary = Color(0xFFFFFFFF);

  /// Secondary text - gray
  static const Color textSecondary = Color(0xFFA0A0A0);

  /// Tertiary text - muted
  static const Color textTertiary = Color(0xFF666666);

  /// Disabled text
  static const Color textDisabled = Color(0xFF4A4A4A);

  // ============================================
  // ACCENT COLORS (10% - Brand/Action)
  // ============================================

  /// Success/Mastery - green
  static const Color accentSuccess = Color(0xFF4ADE80);

  /// In Progress - amber/yellow
  static const Color accentWarning = Color(0xFFFBBF24);

  /// Info - blue
  static const Color accentInfo = Color(0xFF60A5FA);

  /// Celebration/Streak highlight - pink
  static const Color accentHighlight = Color(0xFFF472B6);

  // ============================================
  // STREAK/FIRE COLORS
  // ============================================

  /// Streak fire base - orange-red
  static const Color streakFire = Color(0xFFFF6B35);

  /// Streak glow - gold
  static const Color streakGlow = Color(0xFFFFD700);

  /// Streak gradient colors
  static const List<Color> streakGradient = [
    Color(0xFFFF6B35), // orange-red
    Color(0xFFFFD700), // gold
  ];

  // ============================================
  // MASTERY STATUS COLORS
  // ============================================

  /// Not started - gray
  static const Color masteryNotStarted = Color(0xFF4A4A4A);

  /// In progress - yellow
  static const Color masteryInProgress = Color(0xFFFBBF24);

  /// Mastered - green
  static const Color masteryMastered = Color(0xFF4ADE80);

  // ============================================
  // GRADIENTS
  // ============================================

  /// Fire/streak gradient
  static const LinearGradient fireGradient = LinearGradient(
    colors: [streakFire, streakGlow],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  /// Success gradient
  static const LinearGradient successGradient = LinearGradient(
    colors: [Color(0xFF22C55E), Color(0xFF4ADE80)],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  // ============================================
  // OPACITY VARIANTS
  // ============================================

  /// Mastery green at 10% opacity (for backgrounds)
  static const Color masteryGreenLight = Color(0x1A4ADE80);

  /// Mastery green at 20% opacity
  static const Color masteryGreenMedium = Color(0x334ADE80);

  /// White at 5% opacity
  static const Color whiteLight = Color(0x0DFFFFFF);

  /// White at 10% opacity
  static const Color whiteMedium = Color(0x1AFFFFFF);

  /// White at 20% opacity
  static const Color whiteDark = Color(0x33FFFFFF);
}
