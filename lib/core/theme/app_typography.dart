import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Gudy Typography System
/// Font: Inter - clean, modern, lightweight
class AppTypography {
  AppTypography._();

  // ============================================
  // BASE TEXT STYLE
  // ============================================

  static TextStyle get _baseStyle => GoogleFonts.inter(
    color: AppColors.textPrimary,
    height: 1.5,
  );

  // ============================================
  // HEADINGS
  // ============================================

  /// H1 - 28px Bold
  static TextStyle get heading1 => _baseStyle.copyWith(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.3,
    letterSpacing: -0.02,
  );

  /// H2 - 24px SemiBold
  static TextStyle get heading2 => _baseStyle.copyWith(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.3,
    letterSpacing: -0.02,
  );

  /// H3 - 20px SemiBold
  static TextStyle get heading3 => _baseStyle.copyWith(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  /// H4 - 18px SemiBold
  static TextStyle get heading4 => _baseStyle.copyWith(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  // ============================================
  // BODY TEXT
  // ============================================

  /// Body Large - 18px Regular
  static TextStyle get bodyLarge => _baseStyle.copyWith(
    fontSize: 18,
    fontWeight: FontWeight.w400,
  );

  /// Body - 16px Regular
  static TextStyle get body => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w400,
  );

  /// Body Small - 14px Regular
  static TextStyle get bodySmall => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    color: AppColors.textSecondary,
  );

  // ============================================
  // LABELS & CAPTIONS
  // ============================================

  /// Label Large - 16px Medium
  static TextStyle get labelLarge => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w500,
  );

  /// Label - 14px Medium
  static TextStyle get label => _baseStyle.copyWith(
    fontSize: 14,
    fontWeight: FontWeight.w500,
  );

  /// Caption - 12px Medium
  static TextStyle get caption => _baseStyle.copyWith(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    color: AppColors.textTertiary,
  );

  // ============================================
  // SPECIAL STYLES
  // ============================================

  /// Button text - 16px SemiBold
  static TextStyle get button => _baseStyle.copyWith(
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );

  /// Number/Stats - 24px Bold (monospace feel)
  static TextStyle get stats => GoogleFonts.inter(
    fontSize: 24,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    height: 1.2,
  );

  /// Streak number - 20px Bold
  static TextStyle get streakNumber => GoogleFonts.inter(
    fontSize: 20,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    height: 1.2,
  );

  /// Progress percentage - 14px SemiBold
  static TextStyle get progress => GoogleFonts.inter(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  // ============================================
  // TEXT COLORS HELPERS
  // ============================================

  /// Primary text style
  static TextStyle bodyPrimary([TextStyle? style]) {
    return (_baseStyle.copyWith(fontSize: 16, fontWeight: FontWeight.w400))
        .merge(style);
  }

  /// Secondary text style
  static TextStyle bodySecondary([TextStyle? style]) {
    return (_baseStyle.copyWith(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      color: AppColors.textSecondary,
    )).merge(style);
  }

  /// Muted text style
  static TextStyle bodyMuted([TextStyle? style]) {
    return (_baseStyle.copyWith(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      color: AppColors.textTertiary,
    )).merge(style);
  }
}
