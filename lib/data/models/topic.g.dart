// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'topic.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class TopicAdapter extends TypeAdapter<Topic> {
  @override
  final int typeId = 2;

  @override
  Topic read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Topic(
      id: fields[0] as String,
      subjectId: fields[1] as String,
      parentId: fields[2] as String?,
      title: fields[3] as String,
      description: fields[4] as String?,
      subtopics: (fields[5] as List).cast<String>(),
      status: fields[6] as MasteryStatus,
      completedAt: fields[7] as DateTime?,
      checklist: (fields[8] as List).cast<ChecklistItem>(),
      createdAt: fields[9] as DateTime?,
      lastStudiedAt: fields[10] as DateTime?,
      isLeaf: fields[11] as bool? ?? true,
      order: fields[12] as int? ?? 0,
    );
  }

  @override
  void write(BinaryWriter writer, Topic obj) {
    writer
      ..writeByte(13)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.subjectId)
      ..writeByte(2)
      ..write(obj.parentId)
      ..writeByte(3)
      ..write(obj.title)
      ..writeByte(4)
      ..write(obj.description)
      ..writeByte(5)
      ..write(obj.subtopics)
      ..writeByte(6)
      ..write(obj.status)
      ..writeByte(7)
      ..write(obj.completedAt)
      ..writeByte(8)
      ..write(obj.checklist)
      ..writeByte(9)
      ..write(obj.createdAt)
      ..writeByte(10)
      ..write(obj.lastStudiedAt)
      ..writeByte(11)
      ..write(obj.isLeaf)
      ..writeByte(12)
      ..write(obj.order);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TopicAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
