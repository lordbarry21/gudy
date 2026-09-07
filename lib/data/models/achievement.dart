import 'package:hive/hive.dart';

part 'achievement.g.dart';

/// Achievement model - represents unlocked badges/rewards
@HiveType(typeId: 5)
class Achievement extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String title;

  @HiveField(2)
  final String description;

  @HiveField(3)
  final String icon;

  @HiveField(4)
  bool unlocked;

  @HiveField(5)
  DateTime? unlockedAt;

  @HiveField(6)
  final int requiredValue;

  @HiveField(7)
  final String type;

  Achievement({
    required this.id,
    required this.title,
    required this.description,
    required this.icon,
    this.unlocked = false,
    this.unlockedAt,
    this.requiredValue = 1,
    this.type = 'general',
  });

  /// Unlock this achievement
  void unlock() {
    if (!unlocked) {
      unlocked = true;
      unlockedAt = DateTime.now();
    }
  }

  /// Check if recently unlocked (within 24 hours)
  bool get isRecentlyUnlocked {
    if (!unlocked || unlockedAt == null) return false;
    final diff = DateTime.now().difference(unlockedAt!);
    return diff.inHours < 24;
  }

  @override
  String toString() {
    return 'Achievement(id: $id, title: $title, unlocked: $unlocked)';
  }
}

/// Achievement types
class AchievementTypes {
  static const String general = 'general';
  static const String streak = 'streak';
  static const String progress = 'progress';
  static const String subject = 'subject';
}

/// Predefined achievements
class PredefinedAchievements {
  static List<Achievement> get all => [
        Achievement(
          id: 'first_step',
          title: 'First Step',
          description: 'Complete your first topic',
          icon: '🎯',
          requiredValue: 1,
          type: AchievementTypes.progress,
        ),
        Achievement(
          id: 'consistent',
          title: 'Consistent',
          description: 'Complete 7 topics',
          icon: '🔥',
          requiredValue: 7,
          type: AchievementTypes.progress,
        ),
        Achievement(
          id: 'dedicated',
          title: 'Dedicated',
          description: 'Complete 30 topics',
          icon: '💪',
          requiredValue: 30,
          type: AchievementTypes.progress,
        ),
        Achievement(
          id: 'master',
          title: 'Master',
          description: 'Complete 100 topics',
          icon: '🏆',
          requiredValue: 100,
          type: AchievementTypes.progress,
        ),
        Achievement(
          id: 'week_streak',
          title: 'Week Warrior',
          description: 'Maintain a 7-day streak',
          icon: '🔥',
          requiredValue: 7,
          type: AchievementTypes.streak,
        ),
        Achievement(
          id: 'month_streak',
          title: 'Month Champion',
          description: 'Maintain a 30-day streak',
          icon: '👑',
          requiredValue: 30,
          type: AchievementTypes.streak,
        ),
        Achievement(
          id: 'hundred_streak',
          title: 'Legend',
          description: 'Maintain a 100-day streak',
          icon: '⭐',
          requiredValue: 100,
          type: AchievementTypes.streak,
        ),
        Achievement(
          id: 'math_osn_ready',
          title: 'OSN Ready',
          description: 'Complete all Matematika OSN topics',
          icon: '📐',
          requiredValue: 1,
          type: AchievementTypes.subject,
        ),
        Achievement(
          id: 'math_tka_ready',
          title: 'TKA Expert',
          description: 'Complete all TKA Matematika topics',
          icon: '📊',
          requiredValue: 1,
          type: AchievementTypes.subject,
        ),
        Achievement(
          id: 'language_master',
          title: 'Polyglot',
          description: 'Complete Bahasa Indonesia & Inggris',
          icon: '🌐',
          requiredValue: 2,
          type: AchievementTypes.subject,
        ),
        Achievement(
          id: 'serkom_ready',
          title: 'Serkom Champion',
          description: 'Complete all Serkom Laravel topics',
          icon: '💻',
          requiredValue: 1,
          type: AchievementTypes.subject,
        ),
      ];
}
