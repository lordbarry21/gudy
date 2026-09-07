import 'package:hive/hive.dart';

part 'checklist_item.g.dart';

/// Checklist item model
@HiveType(typeId: 1)
class ChecklistItem extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String title;

  @HiveField(2)
  bool isChecked;

  @HiveField(3)
  DateTime? checkedAt;

  @HiveField(4)
  DateTime createdAt;

  ChecklistItem({
    required this.id,
    required this.title,
    this.isChecked = false,
    this.checkedAt,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  /// Toggle checked status
  void toggle() {
    isChecked = !isChecked;
    checkedAt = isChecked ? DateTime.now() : null;
  }

  /// Mark as checked
  void check() {
    isChecked = true;
    checkedAt = DateTime.now();
  }

  /// Mark as unchecked
  void uncheck() {
    isChecked = false;
    checkedAt = null;
  }

  /// Copy with
  ChecklistItem copyWith({
    String? id,
    String? title,
    bool? isChecked,
    DateTime? checkedAt,
    DateTime? createdAt,
  }) {
    return ChecklistItem(
      id: id ?? this.id,
      title: title ?? this.title,
      isChecked: isChecked ?? this.isChecked,
      checkedAt: checkedAt ?? this.checkedAt,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  String toString() {
    return 'ChecklistItem(id: $id, title: $title, isChecked: $isChecked)';
  }
}
