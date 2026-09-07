import '../models/user_progress.dart';
import '../models/achievement.dart';
import '../local/hive_service.dart';

/// Repository for user progress and achievements
class ProgressRepository {
  /// Get user progress
  UserProgress getProgress() {
    return HiveService.getProgress();
  }

  /// Save user progress
  Future<void> saveProgress(UserProgress progress) async {
    await HiveService.saveProgress(progress);
  }

  /// Update streak
  Future<UserProgress> updateStreak() async {
    final progress = getProgress();
    progress.incrementStreak();
    await HiveService.saveProgress(progress);
    return progress;
  }

  /// Add completed topic
  Future<UserProgress> addCompletedTopic() async {
    final progress = getProgress();
    progress.addCompletedTopic();
    await HiveService.saveProgress(progress);

    // Check and unlock achievements
    await _checkProgressAchievements(progress.totalTopicsCompleted);

    return progress;
  }

  /// Add study time
  Future<void> addStudyTime(int minutes) async {
    final progress = getProgress();
    progress.addStudyTime(minutes);
    await HiveService.saveProgress(progress);
  }

  /// Update user name
  Future<void> updateUserName(String name) async {
    final progress = getProgress();
    progress.userName = name;
    await HiveService.saveProgress(progress);
  }

  /// Update daily goal
  Future<void> updateDailyGoal(int goal) async {
    final progress = getProgress();
    progress.dailyGoal = goal;
    await HiveService.saveProgress(progress);
  }

  /// Get all achievements
  List<Achievement> getAllAchievements() {
    return HiveService.getAllAchievements();
  }

  /// Get unlocked achievements
  List<Achievement> getUnlockedAchievements() {
    return getAllAchievements().where((a) => a.unlocked).toList();
  }

  /// Get locked achievements
  List<Achievement> getLockedAchievements() {
    return getAllAchievements().where((a) => !a.unlocked).toList();
  }

  /// Check and unlock progress achievements
  Future<void> _checkProgressAchievements(int totalCompleted) async {
    final achievements = HiveService.getAllAchievements();
    final progress = getProgress();

    for (final achievement in achievements) {
      if (achievement.unlocked) continue;
      if (achievement.type != AchievementTypes.progress) continue;

      if (totalCompleted >= achievement.requiredValue) {
        achievement.unlock();
        await HiveService.saveAchievement(achievement);
      }
    }

    // Also check streak achievements
    await _checkStreakAchievements(progress.streak);
  }

  /// Check and unlock streak achievements
  Future<void> _checkStreakAchievements(int streak) async {
    final achievements = HiveService.getAllAchievements();

    for (final achievement in achievements) {
      if (achievement.unlocked) continue;
      if (achievement.type != AchievementTypes.streak) continue;

      if (streak >= achievement.requiredValue) {
        achievement.unlock();
        await HiveService.saveAchievement(achievement);
      }
    }
  }

  /// Unlock subject achievement
  Future<void> unlockSubjectAchievement(String achievementId) async {
    final achievement = HiveService.getAchievement(achievementId);
    if (achievement != null && !achievement.unlocked) {
      achievement.unlock();
      await HiveService.saveAchievement(achievement);
    }
  }

  /// Get unlocked count
  int getUnlockedCount() {
    return getUnlockedAchievements().length;
  }

  /// Get total count
  int getTotalCount() {
    return getAllAchievements().length;
  }

  /// Get achievement progress percentage
  double getAchievementProgress() {
    final total = getTotalCount();
    if (total == 0) return 0;
    return (getUnlockedCount() / total) * 100;
  }

  /// Reset all progress (for testing/reset feature)
  Future<void> resetAllProgress() async {
    // Clear progress
    final progress = getProgress();
    progress.streak = 0;
    progress.totalTopicsCompleted = 0;
    progress.totalMinutesSpent = 0;
    progress.totalStudyDays = 0;
    progress.lastActiveAt = null;
    await HiveService.saveProgress(progress);

    // Reset achievements
    final achievements = HiveService.getAllAchievements();
    for (final achievement in achievements) {
      achievement.unlocked = false;
      achievement.unlockedAt = null;
      await HiveService.saveAchievement(achievement);
    }
  }
}
