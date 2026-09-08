import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Gudy Typography System - Beautiful Light Mode Design
class AppTypography {
  AppTypography._();

  // ============================================
  // BASE TEXT STYLE
  // ============================================

  static TextStyle get _baseStyle => GoogleFonts.inter(
    color: AppColors.textPrimary,
    letterSpacing: -0.01,
  );

  // ============================================
  // DISPLAY STYLES
  // ============================================

  static TextStyle get displayLarge => _baseStyle.copyWith(
    fontSize: 36,
    fontWeight: FontWeight.w700,
    height: 1.1,
    letterSpacing: -0.02,
  );

  static TextStyle get displayMedium => _baseStyle.copyWith(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.15,
    letterSpacing: -0.02,
  );

  // ============================================
  // HEADLINE STYLES
  // ============================================

  static TextStyle get headlineLarge => _baseStyle.copyWith(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.02,
  );

  static TextStyle get headlineMedium => _baseStyle.copyWith(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.25,
    letterSpacing: -0.01,
  );

  static TextStyle get headlineSmall => _baseStyle.copyWith(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  // ============================================
  // TITLE STYLES
  // ============================================

  static TextStyle get titleLarge => _baseStyle.copyWith(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static TextStyle get titleMedium => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static TextStyle get titleSmall => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  // ============================================
  // BODY STYLES
  // ============================================

  static TextStyle get bodyLarge => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static TextStyle get bodyMedium => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.textSecondary,
  );

  static TextStyle get bodySmall => _baseStyle.copyWith(
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.textMuted,
  );

  // Aliases
  static TextStyle get body => bodyLarge;
  static TextStyle get caption => labelMedium;
  static TextStyle get heading3 => headlineSmall;
  static TextStyle get heading4 => titleLarge;

  // ============================================
  // LABEL STYLES
  // ============================================

  static TextStyle get labelLarge => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static TextStyle get labelMedium => _baseStyle.copyWith(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static TextStyle get labelSmall => _baseStyle.copyWith(
    fontSize: 11,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.02,
  );

  // ============================================
  // SPECIAL STYLES
  // ============================================

  static TextStyle get button => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.2,
  );

  static TextStyle get buttonLarge => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.2,
  );

  /// Big numbers for stats
  static TextStyle get statsLarge => GoogleFonts.spaceGrotesk(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    height: 1,
    letterSpacing: -0.02,
  );

  static TextStyle get statsMedium => GoogleFonts.spaceGrotesk(
    fontSize: 32,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    height: 1,
  );

  static TextStyle get statsSmall => GoogleFonts.spaceGrotesk(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
    height: 1.1,
  );

  /// Percentage display
  static TextStyle get percentage => GoogleFonts.jetBrainsMono(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  /// Streak number
  static TextStyle get streakNumber => GoogleFonts.spaceGrotesk(
    fontSize: 20,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );
}
