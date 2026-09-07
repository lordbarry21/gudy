// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mastery_status.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class MasteryStatusAdapter extends TypeAdapter<MasteryStatus> {
  @override
  final int typeId = 0;

  @override
  MasteryStatus read(BinaryReader reader) {
    switch (reader.readByte()) {
      case 0:
        return MasteryStatus.notStarted;
      case 1:
        return MasteryStatus.inProgress;
      case 2:
        return MasteryStatus.mastered;
      default:
        return MasteryStatus.notStarted;
    }
  }

  @override
  void write(BinaryWriter writer, MasteryStatus obj) {
    switch (obj) {
      case MasteryStatus.notStarted:
        writer.writeByte(0);
        break;
      case MasteryStatus.inProgress:
        writer.writeByte(1);
        break;
      case MasteryStatus.mastered:
        writer.writeByte(2);
        break;
    }
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is MasteryStatusAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
