import 'package:hive/hive.dart';
import 'mastery_status.dart';
import 'checklist_item.dart';

part 'topic.g.dart';

/// Topic model - represents a single learning topic
@HiveType(typeId: 2)
class Topic extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String subjectId;

  @HiveField(2)
  final String? parentId;

  @HiveField(3)
  final String title;

  @HiveField(4)
  final String? description;

  @HiveField(5)
  final List<String> subtopics;

  @HiveField(6)
  MasteryStatus status;

  @HiveField(7)
  DateTime? completedAt;

  @HiveField(8)
  final List<ChecklistItem> checklist;

  @HiveField(9)
  final DateTime createdAt;

  @HiveField(10)
  DateTime? lastStudiedAt;

  @HiveField(11)
  final bool isLeaf;

  @HiveField(12)
  int order;

  Topic({
    required this.id,
    required this.subjectId,
    this.parentId,
    required this.title,
    this.description,
    this.subtopics = const [],
    this.status = MasteryStatus.notStarted,
    this.completedAt,
    List<ChecklistItem>? checklist,
    DateTime? createdAt,
    this.lastStudiedAt,
    this.isLeaf = true,
    this.order = 0,
  })  : checklist = checklist ?? [],
        createdAt = createdAt ?? DateTime.now();

  /// Get completion percentage
  double get completionPercentage {
    if (checklist.isEmpty) {
      return status == MasteryStatus.mastered ? 100.0 : 0.0;
    }
    final checkedCount = checklist.where((c) => c.isChecked).length;
    return (checkedCount / checklist.length) * 100;
  }

  /// Check if all checklist items are completed
  bool get isChecklistComplete {
    if (checklist.isEmpty) return status == MasteryStatus.mastered;
    return checklist.every((c) => c.isChecked);
  }

  /// Get checked items count
  int get checkedItemsCount => checklist.where((c) => c.isChecked).length;

  /// Update status based on checklist
  void updateStatusFromChecklist() {
    if (isChecklistComplete) {
      status = MasteryStatus.mastered;
      completedAt = DateTime.now();
    } else if (checkedItemsCount > 0) {
      status = MasteryStatus.inProgress;
    } else {
      status = MasteryStatus.notStarted;
    }
  }

  /// Mark as mastered
  void markAsMastered() {
    status = MasteryStatus.mastered;
    completedAt = DateTime.now();
    // Check all checklist items
    for (final item in checklist) {
      item.check();
    }
  }

  /// Reset progress
  void resetProgress() {
    status = MasteryStatus.notStarted;
    completedAt = null;
    for (final item in checklist) {
      item.uncheck();
    }
  }

  /// Add checklist item
  void addChecklistItem(String title) {
    final item = ChecklistItem(
      id: '${id}_cl_${checklist.length}',
      title: title,
    );
    checklist.add(item);
  }

  /// Copy with
  Topic copyWith({
    String? id,
    String? subjectId,
    String? parentId,
    String? title,
    String? description,
    List<String>? subtopics,
    MasteryStatus? status,
    DateTime? completedAt,
    List<ChecklistItem>? checklist,
    DateTime? createdAt,
    DateTime? lastStudiedAt,
    bool? isLeaf,
    int? order,
  }) {
    return Topic(
      id: id ?? this.id,
      subjectId: subjectId ?? this.subjectId,
      parentId: parentId ?? this.parentId,
      title: title ?? this.title,
      description: description ?? this.description,
      subtopics: subtopics ?? this.subtopics,
      status: status ?? this.status,
      completedAt: completedAt ?? this.completedAt,
      checklist: checklist ?? List.from(this.checklist),
      createdAt: createdAt ?? this.createdAt,
      lastStudiedAt: lastStudiedAt ?? this.lastStudiedAt,
      isLeaf: isLeaf ?? this.isLeaf,
      order: order ?? this.order,
    );
  }

  @override
  String toString() {
    return 'Topic(id: $id, title: $title, status: $status, checklist: ${checklist.length})';
  }
}
