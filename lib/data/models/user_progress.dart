import 'package:hive/hive.dart';

part 'user_progress.g.dart';

/// User progress model - tracks overall user learning progress
@HiveType(typeId: 4)
class UserProgress extends HiveObject {
  /// Current streak count
  @HiveField(0)
  int streak;

  /// Longest streak ever
  @HiveField(1)
  int longestStreak;

  /// Last active date
  @HiveField(2)
  DateTime? lastActiveAt;

  /// Total topics completed
  @HiveField(3)
  int totalTopicsCompleted;

  /// Total time spent (in minutes)
  @HiveField(4)
  int totalMinutesSpent;

  /// Daily goal (topics per day)
  @HiveField(5)
  int dailyGoal;

  /// Streak freeze available
  @HiveField(6)
  int streakFreezeAvailable;

  /// Total study days
  @HiveField(7)
  int totalStudyDays;

  /// Created at
  @HiveField(8)
  final DateTime createdAt;

  /// User name
  @HiveField(9)
  String userName;

  UserProgress({
    this.streak = 0,
    this.longestStreak = 0,
    this.lastActiveAt,
    this.totalTopicsCompleted = 0,
    this.totalMinutesSpent = 0,
    this.dailyGoal = 3,
    this.streakFreezeAvailable = 1,
    this.totalStudyDays = 0,
    DateTime? createdAt,
    this.userName = 'Learner',
  }) : createdAt = createdAt ?? DateTime.now();

  /// Check if streak is active today
  bool get isStreakActiveToday {
    if (lastActiveAt == null) return false;
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final lastActive = DateTime(
      lastActiveAt!.year,
      lastActiveAt!.month,
      lastActiveAt!.day,
    );
    return today.isAtSameMomentAs(lastActive);
  }

  /// Check if streak would break if not active today
  bool get wouldStreakBreak {
    if (lastActiveAt == null) return false;
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final lastActive = DateTime(
      lastActiveAt!.year,
      lastActiveAt!.month,
      lastActiveAt!.day,
    );
    final diff = today.difference(lastActive).inDays;
    return diff > 1;
  }

  /// Increment streak
  void incrementStreak() {
    final now = DateTime.now();

    if (lastActiveAt != null) {
      final today = DateTime(now.year, now.month, now.day);
      final lastActive = DateTime(
        lastActiveAt!.year,
        lastActiveAt!.month,
        lastActiveAt!.day,
      );
      final diff = today.difference(lastActive).inDays;

      if (diff == 1) {
        // Consecutive day - increment streak
        streak++;
      } else if (diff > 1) {
        // Streak broken - reset
        streak = 1;
      }
      // If diff == 0, already active today - no change
    } else {
      // First activity
      streak = 1;
      totalStudyDays = 1;
    }

    lastActiveAt = now;

    // Update longest streak
    if (streak > longestStreak) {
      longestStreak = streak;
    }
  }

  /// Reset streak
  void resetStreak() {
    streak = 0;
  }

  /// Add completed topic
  void addCompletedTopic() {
    totalTopicsCompleted++;
    incrementStreak();
  }

  /// Add study time
  void addStudyTime(int minutes) {
    totalMinutesSpent += minutes;
  }

  /// Get total study time formatted
  String get totalStudyTimeFormatted {
    if (totalMinutesSpent < 60) {
      return '$totalMinutesSpent min';
    }
    final hours = totalMinutesSpent ~/ 60;
    final minutes = totalMinutesSpent % 60;
    if (minutes == 0) {
      return '${hours}h';
    }
    return '${hours}h ${minutes}m';
  }

  /// Copy with
  UserProgress copyWith({
    int? streak,
    int? longestStreak,
    DateTime? lastActiveAt,
    int? totalTopicsCompleted,
    int? totalMinutesSpent,
    int? dailyGoal,
    int? streakFreezeAvailable,
    int? totalStudyDays,
    DateTime? createdAt,
    String? userName,
  }) {
    return UserProgress(
      streak: streak ?? this.streak,
      longestStreak: longestStreak ?? this.longestStreak,
      lastActiveAt: lastActiveAt ?? this.lastActiveAt,
      totalTopicsCompleted: totalTopicsCompleted ?? this.totalTopicsCompleted,
      totalMinutesSpent: totalMinutesSpent ?? this.totalMinutesSpent,
      dailyGoal: dailyGoal ?? this.dailyGoal,
      streakFreezeAvailable: streakFreezeAvailable ?? this.streakFreezeAvailable,
      totalStudyDays: totalStudyDays ?? this.totalStudyDays,
      createdAt: createdAt ?? this.createdAt,
      userName: userName ?? this.userName,
    );
  }

  @override
  String toString() {
    return 'UserProgress(streak: $streak, completed: $totalTopicsCompleted)';
  }
}
