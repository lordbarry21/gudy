import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:share_plus/share_plus.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/models/topic.dart';
import '../../../data/models/mastery_status.dart';
import '../../../data/repositories/subject_repository.dart';
import '../../../data/repositories/progress_repository.dart';
import '../../shared/widgets/progress_bar.dart';
import '../../shared/widgets/checklist_tile.dart';
import '../../shared/widgets/modern_cards.dart';

/// Topic Detail Screen - Beautiful Gradient Design
class TopicDetailScreen extends ConsumerStatefulWidget {
  final String subjectId;
  final String topicId;

  const TopicDetailScreen({
    super.key,
    required this.subjectId,
    required this.topicId,
  });

  @override
  ConsumerState<TopicDetailScreen> createState() => _TopicDetailScreenState();
}

class _TopicDetailScreenState extends ConsumerState<TopicDetailScreen>
    with SingleTickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();

  @override
  Widget build(BuildContext context) {
    final topic = _subjectRepo.getTopic(widget.topicId);
    final subject = _subjectRepo.getSubject(widget.subjectId);

    if (topic == null || subject == null) {
      return const Scaffold(
        body: Center(child: Text('Topic not found')),
      );
    }

    final subjectGradient = AppColors.getSubjectGradient(widget.subjectId);
    final accentColor = subjectGradient.colors.first;

    return Scaffold(
      backgroundColor: AppColors.backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.cardLight,
            borderRadius: BorderRadius.circular(12),
            boxShadow: AppColors.getSoftShadow(),
          ),
          child: IconButton(
            icon: const Icon(Icons.arrow_back, size: 20),
            onPressed: () => context.pop(),
          ),
        ),
        title: Text(
          topic.title,
          style: AppTypography.titleMedium,
        ),
        actions: [
          PopupMenuButton<String>(
            icon: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.cardLight,
                borderRadius: BorderRadius.circular(12),
                boxShadow: AppColors.getSoftShadow(),
              ),
              child: const Icon(Icons.more_vert, size: 20),
            ),
            color: AppColors.cardLight,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            onSelected: (value) => _handleMenuAction(value, topic),
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'mark_mastered',
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        gradient: subjectGradient,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(
                        Icons.check_circle,
                        size: 16,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      topic.status == MasteryStatus.mastered
                          ? 'Already Mastered'
                          : 'Mark as Mastered',
                    ),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'reset',
                child: Row(
                  children: [
                    Icon(Icons.refresh, size: 18),
                    SizedBox(width: 12),
                    Text('Reset Progress'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppTheme.screenPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Progress card
            _buildProgressCard(topic, subjectGradient),
            const SizedBox(height: 24),

            // Checklist section
            _buildChecklistSection(topic, subjectGradient),
            const SizedBox(height: 24),

            // AI Prompt section
            _buildAiPromptSection(topic, subject, subjectGradient),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressCard(Topic topic, LinearGradient gradient) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.cardLight,
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppColors.getSoftShadow(),
        border: Border.all(color: AppColors.border),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Mastery', style: AppTypography.titleMedium),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  gradient: gradient,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  topic.status.displayName,
                  style: AppTypography.labelMedium.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            height: 10,
            decoration: BoxDecoration(
              color: gradient.colors.first.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(5),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: topic.completionPercentage / 100,
              child: Container(
                decoration: BoxDecoration(
                  gradient: gradient,
                  borderRadius: BorderRadius.circular(5),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${topic.checkedItemsCount}/${topic.checklist.length} completed',
                style: AppTypography.bodyMedium,
              ),
              ShaderMask(
                shaderCallback: (bounds) => gradient.createShader(bounds),
                child: Text(
                  '${topic.completionPercentage.toStringAsFixed(0)}%',
                  style: AppTypography.statsSmall.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildChecklistSection(Topic topic, LinearGradient gradient) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: gradient,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.checklist, color: Colors.white, size: 18),
                ),
                const SizedBox(width: 12),
                Text('Checklist', style: AppTypography.titleMedium),
              ],
            ),
            TextButton.icon(
              onPressed: () => _showAddChecklistDialog(topic),
              icon: ShaderMask(
                shaderCallback: (bounds) => gradient.createShader(bounds),
                child: const Icon(Icons.add, size: 16, color: Colors.white),
              ),
              label: ShaderMask(
                shaderCallback: (bounds) => gradient.createShader(bounds),
                child: Text(
                  'Add',
                  style: AppTypography.labelMedium.copyWith(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        if (topic.checklist.isEmpty)
          Container(
            decoration: BoxDecoration(
              color: AppColors.cardLight,
              borderRadius: BorderRadius.circular(20),
              boxShadow: AppColors.getSoftShadow(),
              border: Border.all(color: AppColors.border),
            ),
            padding: const EdgeInsets.all(32),
            child: Center(
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          gradient.colors.first.withValues(alpha: 0.1),
                          gradient.colors.last.withValues(alpha: 0.1),
                        ],
                      ),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.checklist,
                      size: 48,
                      color: AppColors.textMuted,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No items yet',
                    style: AppTypography.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                    ),
                    onPressed: () => _showAddChecklistDialog(topic),
                    child: ShaderMask(
                      shaderCallback: (bounds) => gradient.createShader(bounds),
                      child: Text(
                        'Add first item',
                        style: AppTypography.labelMedium.copyWith(color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: AppColors.cardLight,
              borderRadius: BorderRadius.circular(20),
              boxShadow: AppColors.getSoftShadow(),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              children: topic.checklist.asMap().entries.map((entry) {
                return ChecklistTile(
                  item: entry.value,
                  onChanged: (checked) {
                    _toggleChecklistItem(topic, entry.value.id);
                  },
                );
              }).toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildAiPromptSection(Topic topic, subject, LinearGradient gradient) {
    final prompt = _subjectRepo.generateAiPrompt(topic.title);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: gradient,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text('🤖', style: TextStyle(fontSize: 18)),
            ),
            const SizedBox(width: 12),
            Text('AI Prompt', style: AppTypography.titleMedium),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: AppColors.cardLight,
            borderRadius: BorderRadius.circular(20),
            boxShadow: AppColors.getSoftShadow(),
            border: Border.all(color: AppColors.border),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  prompt,
                  style: AppTypography.bodySmall.copyWith(
                    fontFamily: 'monospace',
                    color: AppColors.textSecondary,
                    height: 1.5,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => _copyToClipboard(prompt),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        decoration: BoxDecoration(
                          gradient: gradient,
                          borderRadius: BorderRadius.circular(14),
                          boxShadow: [
                            BoxShadow(
                              color: gradient.colors.first.withValues(alpha: 0.3),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.copy, color: Colors.white, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              'Copy',
                              style: AppTypography.button.copyWith(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  GestureDetector(
                    onTap: () => _sharePrompt(prompt),
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: AppColors.cardElevated,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Icon(Icons.share, color: AppColors.textPrimary, size: 20),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _handleMenuAction(String action, Topic topic) {
    switch (action) {
      case 'mark_mastered':
        _markAsMastered(topic);
        break;
      case 'reset':
        _resetProgress(topic);
        break;
    }
  }

  void _toggleChecklistItem(Topic topic, String itemId) {
    HapticFeedback.lightImpact();
    _subjectRepo.toggleChecklistItem(topic.id, itemId);
    setState(() {});

    final updatedTopic = _subjectRepo.getTopic(topic.id);
    if (updatedTopic != null &&
        updatedTopic.status == MasteryStatus.mastered &&
        topic.status != MasteryStatus.mastered) {
      _progressRepo.addCompletedTopic();
      _subjectRepo.refreshSubjectCounts();
      _showMasteredSnackbar();
    }
  }

  void _markAsMastered(Topic topic) {
    HapticFeedback.mediumImpact();
    _subjectRepo.markAsMastered(topic.id);
    _progressRepo.addCompletedTopic();
    _subjectRepo.refreshSubjectCounts();
    setState(() {});
    _showMasteredSnackbar();
  }

  void _resetProgress(Topic topic) {
    _subjectRepo.resetTopicProgress(topic.id);
    setState(() {});
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white),
            const SizedBox(width: 10),
            const Text('Progress reset'),
          ],
        ),
        backgroundColor: AppColors.textPrimary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _showAddChecklistDialog(Topic topic) {
    final controller = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: AppColors.cardLight,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Add Checklist Item',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 20),
              Container(
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: TextField(
                  controller: controller,
                  autofocus: true,
                  decoration: const InputDecoration(
                    hintText: 'Enter item title',
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.all(16),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text(
                      'Cancel',
                      style: TextStyle(color: AppColors.textMuted),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Container(
                    decoration: BoxDecoration(
                      gradient: AppColors.mainGradient,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.transparent,
                        shadowColor: Colors.transparent,
                      ),
                      onPressed: () {
                        if (controller.text.isNotEmpty) {
                          _subjectRepo.addChecklistItem(topic.id, controller.text);
                          setState(() {});
                          Navigator.pop(context);
                        }
                      },
                      child: const Text('Add'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white),
            const SizedBox(width: 10),
            const Text('Copied to clipboard!'),
          ],
        ),
        backgroundColor: AppColors.accentEmerald,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _sharePrompt(String text) {
    Share.share(text, subject: 'AI Learning Prompt');
  }

  void _showMasteredSnackbar() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Text('🎉', style: TextStyle(fontSize: 20)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Topic Mastered!',
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  Text(
                    'Keep up the great work!',
                    style: AppTypography.bodySmall.copyWith(
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: AppColors.accentEmerald,
        duration: const Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
