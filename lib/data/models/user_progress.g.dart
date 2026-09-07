// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_progress.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class UserProgressAdapter extends TypeAdapter<UserProgress> {
  @override
  final int typeId = 4;

  @override
  UserProgress read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return UserProgress(
      streak: fields[0] as int? ?? 0,
      longestStreak: fields[1] as int? ?? 0,
      lastActiveAt: fields[2] as DateTime?,
      totalTopicsCompleted: fields[3] as int? ?? 0,
      totalMinutesSpent: fields[4] as int? ?? 0,
      dailyGoal: fields[5] as int? ?? 3,
      streakFreezeAvailable: fields[6] as int? ?? 1,
      totalStudyDays: fields[7] as int? ?? 0,
      createdAt: fields[8] as DateTime?,
      userName: fields[9] as String? ?? 'Learner',
    );
  }

  @override
  void write(BinaryWriter writer, UserProgress obj) {
    writer
      ..writeByte(10)
      ..writeByte(0)
      ..write(obj.streak)
      ..writeByte(1)
      ..write(obj.longestStreak)
      ..writeByte(2)
      ..write(obj.lastActiveAt)
      ..writeByte(3)
      ..write(obj.totalTopicsCompleted)
      ..writeByte(4)
      ..write(obj.totalMinutesSpent)
      ..writeByte(5)
      ..write(obj.dailyGoal)
      ..writeByte(6)
      ..write(obj.streakFreezeAvailable)
      ..writeByte(7)
      ..write(obj.totalStudyDays)
      ..writeByte(8)
      ..write(obj.createdAt)
      ..writeByte(9)
      ..write(obj.userName);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserProgressAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
