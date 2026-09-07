import 'package:hive/hive.dart';

part 'mastery_status.g.dart';

/// Mastery status enum
@HiveType(typeId: 0)
enum MasteryStatus {
  @HiveField(0)
  notStarted,

  @HiveField(1)
  inProgress,

  @HiveField(2)
  mastered,
}

extension MasteryStatusExtension on MasteryStatus {
  /// Get display name
  String get displayName {
    switch (this) {
      case MasteryStatus.notStarted:
        return 'Not Started';
      case MasteryStatus.inProgress:
        return 'In Progress';
      case MasteryStatus.mastered:
        return 'Mastered';
    }
  }

  /// Get icon
  String get icon {
    switch (this) {
      case MasteryStatus.notStarted:
        return '⚪';
      case MasteryStatus.inProgress:
        return '🟡';
      case MasteryStatus.mastered:
        return '🟢';
    }
  }

  /// Get color value
  int get colorValue {
    switch (this) {
      case MasteryStatus.notStarted:
        return 0xFF4A4A4A;
      case MasteryStatus.inProgress:
        return 0xFFFBBF24;
      case MasteryStatus.mastered:
        return 0xFF4ADE80;
    }
  }

  /// Check if can start
  bool get canStart => true;

  /// Check if can continue
  bool get canContinue => this == MasteryStatus.inProgress || this == MasteryStatus.mastered;

  /// Check if is completed
  bool get isCompleted => this == MasteryStatus.mastered;
}
