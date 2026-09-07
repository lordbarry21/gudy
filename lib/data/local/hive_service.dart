import 'package:hive_flutter/hive_flutter.dart';
import '../models/mastery_status.dart';
import '../models/checklist_item.dart';
import '../models/topic.dart';
import '../models/subject.dart';
import '../models/user_progress.dart';
import '../models/achievement.dart';

/// Hive local storage service
class HiveService {
  static const String _progressBoxName = 'progress_box';
  static const String _dataBoxName = 'data_box';

  static Box<UserProgress>? _progressBox;
  static Box<Topic>? _topicsBox;
  static Box<Subject>? _subjectsBox;
  static Box<Achievement>? _achievementsBox;

  /// Initialize Hive and register adapters
  static Future<void> init() async {
    await Hive.initFlutter();

    // Register adapters
    Hive.registerAdapter(MasteryStatusAdapter());
    Hive.registerAdapter(ChecklistItemAdapter());
    Hive.registerAdapter(TopicAdapter());
    Hive.registerAdapter(SubjectAdapter());
    Hive.registerAdapter(UserProgressAdapter());
    Hive.registerAdapter(AchievementAdapter());

    // Open boxes
    _progressBox = await Hive.openBox<UserProgress>(_progressBoxName);
    _topicsBox = await Hive.openBox<Topic>('topics_box');
    _subjectsBox = await Hive.openBox<Subject>(_dataBoxName);
    _achievementsBox = await Hive.openBox<Achievement>('achievements_box');
  }

  // ============================================
  // Progress Box
  // ============================================

  static Box<UserProgress> get progressBox {
    if (_progressBox == null) {
      throw Exception('Hive not initialized. Call HiveService.init() first.');
    }
    return _progressBox!;
  }

  static UserProgress getProgress() {
    if (progressBox.isEmpty) {
      final progress = UserProgress();
      progressBox.put('user', progress);
      return progress;
    }
    return progressBox.get('user')!;
  }

  static Future<void> saveProgress(UserProgress progress) async {
    await progressBox.put('user', progress);
  }

  // ============================================
  // Topics Box
  // ============================================

  static Box<Topic> get topicsBox {
    if (_topicsBox == null) {
      throw Exception('Hive not initialized. Call HiveService.init() first.');
    }
    return _topicsBox!;
  }

  static List<Topic> getAllTopics() {
    return topicsBox.values.toList();
  }

  static List<Topic> getTopicsBySubject(String subjectId) {
    return topicsBox.values
        .where((t) => t.subjectId == subjectId)
        .toList();
  }

  static List<Topic> getTopicsByParent(String? parentId) {
    return topicsBox.values
        .where((t) => t.parentId == parentId)
        .toList();
  }

  static Topic? getTopic(String id) {
    return topicsBox.get(id);
  }

  static Future<void> saveTopic(Topic topic) async {
    await topicsBox.put(topic.id, topic);
  }

  static Future<void> saveTopics(List<Topic> topics) async {
    final map = {for (var t in topics) t.id: t};
    await topicsBox.putAll(map);
  }

  // ============================================
  // Subjects Box
  // ============================================

  static Box<Subject> get subjectsBox {
    if (_subjectsBox == null) {
      throw Exception('Hive not initialized. Call HiveService.init() first.');
    }
    return _subjectsBox!;
  }

  static List<Subject> getAllSubjects() {
    if (subjectsBox.isEmpty) return [];
    return subjectsBox.values.toList()
      ..sort((a, b) => a.order.compareTo(b.order));
  }

  static Subject? getSubject(String id) {
    return subjectsBox.get(id);
  }

  static Future<void> saveSubject(Subject subject) async {
    await subjectsBox.put(subject.id, subject);
  }

  static Future<void> saveSubjects(List<Subject> subjects) async {
    final map = {for (var s in subjects) s.id: s};
    await subjectsBox.putAll(map);
  }

  // ============================================
  // Achievements Box
  // ============================================

  static Box<Achievement> get achievementsBox {
    if (_achievementsBox == null) {
      throw Exception('Hive not initialized. Call HiveService.init() first.');
    }
    return _achievementsBox!;
  }

  static List<Achievement> getAllAchievements() {
    if (achievementsBox.isEmpty) {
      // Initialize with predefined achievements
      final achievements = PredefinedAchievements.all;
      final map = {for (var a in achievements) a.id: a};
      achievementsBox.putAll(map);
      return achievements;
    }
    return achievementsBox.values.toList();
  }

  static Achievement? getAchievement(String id) {
    return achievementsBox.get(id);
  }

  static Future<void> saveAchievement(Achievement achievement) async {
    await achievementsBox.put(achievement.id, achievement);
  }

  // ============================================
  // Utility
  // ============================================

  /// Clear all data (for testing/reset)
  static Future<void> clearAll() async {
    await _progressBox?.clear();
    await _topicsBox?.clear();
    await _subjectsBox?.clear();
    await _achievementsBox?.clear();
  }

  /// Close all boxes
  static Future<void> close() async {
    await Hive.close();
  }
}
