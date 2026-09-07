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
import '../../shared/widgets/animated_button.dart';

/// Topic Detail Screen - Checklist & AI Prompt
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

class _TopicDetailScreenState extends ConsumerState<TopicDetailScreen> {
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

    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryBackground,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: Text(
          topic.title,
          style: AppTypography.heading4,
        ),
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(Icons.more_vert),
            color: AppColors.cardBackground,
            onSelected: (value) => _handleMenuAction(value, topic),
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'mark_mastered',
                enabled: topic.status != MasteryStatus.mastered,
                child: Row(
                  children: [
                    const Icon(Icons.check_circle, size: 20),
                    const SizedBox(width: 8),
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
                    Icon(Icons.refresh, size: 20),
                    SizedBox(width: 8),
                    Text('Reset Progress'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppTheme.screenPadding),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Progress card
            _buildProgressCard(topic),

            const SizedBox(height: AppTheme.spacingLg),

            // Checklist section
            _buildChecklistSection(topic),

            const SizedBox(height: AppTheme.spacingLg),

            // AI Prompt section
            _buildAiPromptSection(topic, subject),

            const SizedBox(height: AppTheme.spacingLg),

            // Actions
            _buildActionsSection(topic),

            const SizedBox(height: AppTheme.spacingXxl),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressCard(Topic topic) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Mastery', style: AppTypography.label),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: Color(topic.status.colorValue).withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  topic.status.displayName,
                  style: AppTypography.caption.copyWith(
                    color: Color(topic.status.colorValue),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingMd),
          ProgressBar(
            percentage: topic.completionPercentage,
            height: 10,
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${topic.checkedItemsCount}/${topic.checklist.length} completed',
                style: AppTypography.bodySmall,
              ),
              Text(
                '${topic.completionPercentage.toStringAsFixed(0)}%',
                style: AppTypography.stats.copyWith(
                  color: AppColors.accentSuccess,
                  fontSize: 18,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildChecklistSection(Topic topic) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Checklist', style: AppTypography.heading4),
            TextButton.icon(
              onPressed: () => _showAddChecklistDialog(topic),
              icon: const Icon(Icons.add, size: 18),
              label: const Text('Add'),
            ),
          ],
        ),
        const SizedBox(height: AppTheme.spacingSm),

        if (topic.checklist.isEmpty)
          Container(
            padding: const EdgeInsets.all(AppTheme.cardPadding),
            decoration: BoxDecoration(
              color: AppColors.cardBackground,
              borderRadius: BorderRadius.circular(AppTheme.cardRadius),
              border: Border.all(color: AppColors.border),
            ),
            child: Center(
              child: Column(
                children: [
                  const Icon(
                    Icons.checklist,
                    size: 48,
                    color: AppColors.textTertiary,
                  ),
                  const SizedBox(height: AppTheme.spacingSm),
                  Text(
                    'No checklist items yet',
                    style: AppTypography.body.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: AppTheme.spacingSm),
                  TextButton(
                    onPressed: () => _showAddChecklistDialog(topic),
                    child: const Text('Add your first item'),
                  ),
                ],
              ),
            ),
          )
        else
          Container(
            decoration: BoxDecoration(
              color: AppColors.cardBackground,
              borderRadius: BorderRadius.circular(AppTheme.cardRadius),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              children: topic.checklist
                  .asMap()
                  .entries
                  .map((entry) => ChecklistTile(
                        item: entry.value,
                        onChanged: (checked) {
                          _toggleChecklistItem(topic, entry.value.id);
                        },
                      ))
                  .toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildAiPromptSection(Topic topic, subject) {
    final prompt = _subjectRepo.generateAiPrompt(topic.title);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('AI Learning Assistant', style: AppTypography.heading4),
        const SizedBox(height: AppTheme.spacingSm),
        Container(
          padding: const EdgeInsets.all(AppTheme.cardPadding),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppColors.accentInfo.withOpacity(0.15),
                AppColors.accentHighlight.withOpacity(0.1),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(AppTheme.cardRadius),
            border: Border.all(
              color: AppColors.accentInfo.withOpacity(0.3),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppColors.accentInfo.withOpacity(0.2),
                      shape: BoxShape.circle,
                    ),
                    child: const Text('🤖', style: TextStyle(fontSize: 20)),
                  ),
                  const SizedBox(width: AppTheme.spacingMd),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Generate AI Prompt',
                          style: AppTypography.label,
                        ),
                        Text(
                          'Copy this prompt to ChatGPT, Gemini, etc.',
                          style: AppTypography.caption,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Container(
                padding: const EdgeInsets.all(AppTheme.spacingMd),
                decoration: BoxDecoration(
                  color: AppColors.primaryBackground.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  prompt,
                  style: AppTypography.bodySmall.copyWith(
                    fontFamily: 'monospace',
                    color: AppColors.textSecondary,
                  ),
                ),
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Row(
                children: [
                  Expanded(
                    child: AnimatedButton(
                      label: 'Copy to Clipboard',
                      icon: Icons.copy,
                      onPressed: () => _copyToClipboard(prompt),
                    ),
                  ),
                  const SizedBox(width: AppTheme.spacingSm),
                  AnimatedIconButton(
                    icon: Icons.share,
                    onPressed: () => _sharePrompt(prompt),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildActionsSection(Topic topic) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Actions', style: AppTypography.heading4),
        const SizedBox(height: AppTheme.spacingSm),
        Row(
          children: [
            Expanded(
              child: AnimatedButton(
                label: 'Practice Questions',
                icon: Icons.quiz,
                isPrimary: false,
                onPressed: () {
                  // TODO: Navigate to practice
                },
              ),
            ),
          ],
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
    _subjectRepo.toggleChecklistItem(topic.id, itemId);
    setState(() {});

    // Check if topic is now mastered
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
      const SnackBar(content: Text('Progress reset')),
    );
  }

  void _showAddChecklistDialog(Topic topic) {
    final controller = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text('Add Checklist Item'),
        content: TextField(
          controller: controller,
          autofocus: true,
          decoration: const InputDecoration(
            hintText: 'Enter item title',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              if (controller.text.isNotEmpty) {
                _subjectRepo.addChecklistItem(topic.id, controller.text);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Prompt copied to clipboard!'),
        duration: Duration(seconds: 2),
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
            const Text('🎉 '),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('Topic Mastered!'),
                  Text(
                    'Keep up the great work!',
                    style: AppTypography.caption,
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: AppColors.accentSuccess,
        duration: const Duration(seconds: 3),
      ),
    );
  }
}
