// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'subject.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class SubjectAdapter extends TypeAdapter<Subject> {
  @override
  final int typeId = 3;

  @override
  Subject read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Subject(
      id: fields[0] as String,
      name: fields[1] as String,
      icon: fields[2] as String,
      description: fields[3] as String? ?? '',
      totalTopics: fields[4] as int? ?? 0,
      completedTopics: fields[5] as int? ?? 0,
      totalBranches: fields[6] as int? ?? 0,
      completedBranches: fields[7] as int? ?? 0,
      color: Color(fields[8] as int? ?? 0xFF4ADE80),
      order: fields[9] as int? ?? 0,
      createdAt: fields[10] as DateTime?,
    );
  }

  @override
  void write(BinaryWriter writer, Subject obj) {
    writer
      ..writeByte(11)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.name)
      ..writeByte(2)
      ..write(obj.icon)
      ..writeByte(3)
      ..write(obj.description)
      ..writeByte(4)
      ..write(obj.totalTopics)
      ..writeByte(5)
      ..write(obj.completedTopics)
      ..writeByte(6)
      ..write(obj.totalBranches)
      ..writeByte(7)
      ..write(obj.completedBranches)
      ..writeByte(8)
      ..write(obj.color.value)
      ..writeByte(9)
      ..write(obj.order)
      ..writeByte(10)
      ..write(obj.createdAt);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is SubjectAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
