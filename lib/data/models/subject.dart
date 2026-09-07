import 'package:flutter/material.dart';
import 'package:hive/hive.dart';

part 'subject.g.dart';

/// Subject model - represents a learning subject/category
@HiveType(typeId: 3)
class Subject extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String name;

  @HiveField(2)
  final String icon;

  @HiveField(3)
  final String description;

  @HiveField(4)
  final int totalTopics;

  @HiveField(5)
  final int completedTopics;

  @HiveField(6)
  final int totalBranches;

  @HiveField(7)
  final int completedBranches;

  @HiveField(8)
  final Color color;

  @HiveField(9)
  final int order;

  @HiveField(10)
  final DateTime createdAt;

  Subject({
    required this.id,
    required this.name,
    required this.icon,
    this.description = '',
    this.totalTopics = 0,
    this.completedTopics = 0,
    this.totalBranches = 0,
    this.completedBranches = 0,
    this.color = const Color(0xFF4ADE80),
    this.order = 0,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  /// Get progress percentage
  double get progressPercentage {
    if (totalTopics == 0) return 0.0;
    return (completedTopics / totalTopics) * 100;
  }

  /// Get branch progress percentage
  double get branchProgressPercentage {
    if (totalBranches == 0) return 0.0;
    return (completedBranches / totalBranches) * 100;
  }

  /// Get display subtitle
  String get subtitle {
    if (totalBranches > 0) {
      return '$totalBranches branches • $totalTopics topics';
    }
    return '$totalTopics topics';
  }

  /// Get progress text
  String get progressText {
    return '${progressPercentage.toStringAsFixed(0)}%';
  }

  /// Check if is completed
  bool get isCompleted => completedTopics >= totalTopics && totalTopics > 0;

  /// Check if has any progress
  bool get hasProgress => completedTopics > 0;

  /// Copy with
  Subject copyWith({
    String? id,
    String? name,
    String? icon,
    String? description,
    int? totalTopics,
    int? completedTopics,
    int? totalBranches,
    int? completedBranches,
    Color? color,
    int? order,
    DateTime? createdAt,
  }) {
    return Subject(
      id: id ?? this.id,
      name: name ?? this.name,
      icon: icon ?? this.icon,
      description: description ?? this.description,
      totalTopics: totalTopics ?? this.totalTopics,
      completedTopics: completedTopics ?? this.completedTopics,
      totalBranches: totalBranches ?? this.totalBranches,
      completedBranches: completedBranches ?? this.completedBranches,
      color: color ?? this.color,
      order: order ?? this.order,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  String toString() {
    return 'Subject(id: $id, name: $name, progress: $progressPercentage%)';
  }
}
