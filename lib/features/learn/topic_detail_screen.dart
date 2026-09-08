import 'dart:async';
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
import '../../shared/widgets/animated_widgets.dart';

/// Topic Detail Screen - VIBRANT ANIMATED with Study Timer
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
    with TickerProviderStateMixin {
  final _subjectRepo = SubjectRepository();
  final _progressRepo = ProgressRepository();

  // Study Timer State
  Timer? _timer;
  int _studySeconds = 0;
  bool _isStudying = false;
  bool _showCelebration = false;

  late AnimationController _pulseController;
  late AnimationController _headerController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _headerController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    )..forward();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pulseController.dispose();
    _headerController.dispose();
    super.dispose();
  }

  void _startTimer() {
    _timer?.cancel();
    _isStudying = true;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _studySeconds++;
      });
    });
    HapticFeedback.mediumImpact();
  }

  void _pauseTimer() {
    _timer?.cancel();
    _isStudying = false;
    HapticFeedback.lightImpact();
  }

  void _resetTimer() {
    _timer?.cancel();
    if (_studySeconds > 0) {
      // Save study time
      _progressRepo.addStudyTime(_studySeconds ~/ 60);
    }
    setState(() {
      _studySeconds = 0;
      _isStudying = false;
    });
    HapticFeedback.lightImpact();
  }

  String _formatTime(int seconds) {
    final hours = seconds ~/ 3600;
    final minutes = (seconds % 3600) ~/ 60;
    final secs = seconds % 60;
    if (hours > 0) {
      return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
    }
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

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

    return CelebrationEffect(
      isActive: _showCelebration,
      child: Scaffold(
        backgroundColor: AppColors.backgroundLight,
        appBar: _buildAppBar(topic),
        body: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.all(AppTheme.screenPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Study Timer Card
              _buildStudyTimerCard(subjectGradient),
              const SizedBox(height: 24),

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
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(Topic topic) {
    return AppBar(
      backgroundColor: Colors.transparent,
      leading: BounceButton(
        onTap: () {
          if (_studySeconds > 0) {
            _progressRepo.addStudyTime(_studySeconds ~/ 60);
          }
          context.pop();
        },
        child: Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.cardLight,
            borderRadius: BorderRadius.circular(12),
            boxShadow: AppColors.getSoftShadow(),
          ),
          child: const Icon(Icons.arrow_back, size: 20),
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
    );
  }

  Widget _buildStudyTimerCard(LinearGradient gradient) {
    return NeonGlowContainer(
      glowColor: _isStudying ? AppColors.accentEmerald : AppColors.accentPurple,
      blurRadius: _isStudying ? 30 : 20,
      border: Border.all(
        color: (_isStudying ? AppColors.accentEmerald : AppColors.accentPurple)
            .withValues(alpha: 0.3),
      ),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.cardLight,
          borderRadius: BorderRadius.circular(20),
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    PulsingWidget(
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          gradient: gradient,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          _isStudying ? Icons.timer : Icons.timer_outlined,
                          color: Colors.white,
                          size: 22,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Study Timer',
                      style: AppTypography.titleMedium.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
                if (_isStudying)
                  PulsingWidget(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.accentEmerald.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: AppColors.accentEmerald,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Studying',
                            style: AppTypography.labelSmall.copyWith(
                              color: AppColors.accentEmerald,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 20),
            // Timer Display
            AnimatedBuilder(
              animation: _pulseController,
              builder: (context, child) {
                return Transform.scale(
                  scale: _isStudying ? 1 + (_pulseController.value * 0.02) : 1,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 16,
                    ),
                    decoration: BoxDecoration(
                      color: _isStudying
                          ? AppColors.accentEmerald.withValues(alpha: 0.1)
                          : AppColors.surfaceLight,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      _formatTime(_studySeconds),
                      style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.w800,
                        color: _isStudying
                            ? AppColors.accentEmerald
                            : AppColors.textPrimary,
                        fontFeatures: const [FontFeature.tabularFigures()],
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            // Timer Controls
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (!_isStudying && _studySeconds == 0) ...[
                  // Start button
                  BounceButton(
                    onTap: _startTimer,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 14,
                      ),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [AppColors.accentEmerald, AppColors.accentCyan],
                        ),
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: AppColors.getNeonGlow(
                          AppColors.accentEmerald,
                          blur: 20,
                          intensity: 0.4,
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.play_arrow_rounded,
                            color: Colors.white,
                            size: 24,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Start Studying',
                            style: AppTypography.button.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ] else if (_isStudying) ...[
                  // Pause button
                  BounceButton(
                    onTap: _pauseTimer,
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.accentAmber.withValues(alpha: 0.15),
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: AppColors.accentAmber.withValues(alpha: 0.3),
                        ),
                      ),
                      child: const Icon(
                        Icons.pause_rounded,
                        color: AppColors.accentAmber,
                        size: 28,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  // Reset button
                  BounceButton(
                    onTap: _resetTimer,
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [AppColors.accentPurple, AppColors.accentPink],
                        ),
                        shape: BoxShape.circle,
                        boxShadow: AppColors.getNeonGlow(
                          AppColors.accentPurple,
                          blur: 15,
                          intensity: 0.3,
                        ),
                      ),
                      child: const Icon(
                        Icons.check_rounded,
                        color: Colors.white,
                        size: 28,
                      ),
                    ),
                  ),
                ] else ...[
                  // Resume button
                  BounceButton(
                    onTap: _startTimer,
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [AppColors.accentEmerald, AppColors.accentCyan],
                        ),
                        shape: BoxShape.circle,
                        boxShadow: AppColors.getNeonGlow(
                          AppColors.accentEmerald,
                          blur: 20,
                          intensity: 0.4,
                        ),
                      ),
                      child: const Icon(
                        Icons.play_arrow_rounded,
                        color: Colors.white,
                        size: 28,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  // Reset button
                  BounceButton(
                    onTap: _resetTimer,
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.cardElevated,
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Icon(
                        Icons.refresh_rounded,
                        color: AppColors.textSecondary,
                        size: 28,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressCard(Topic topic, LinearGradient gradient) {
    return StaggeredAnimation(
      index: 0,
      child: Container(
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
                Row(
                  children: [
                    PulsingWidget(
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          gradient: gradient,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(
                          Icons.emoji_events,
                          color: Colors.white,
                          size: 18,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text('Mastery', style: AppTypography.titleMedium),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    gradient: gradient,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: gradient.colors.first.withValues(alpha: 0.3),
                        blurRadius: 10,
                        offset: const Offset(0, 2),
                      ),
                    ],
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
            AnimatedProgressBar(
              progress: topic.completionPercentage,
              gradient: gradient,
              height: 12,
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
      ),
    );
  }

  Widget _buildChecklistSection(Topic topic, LinearGradient gradient) {
    return StaggeredAnimation(
      index: 1,
      child: Column(
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
              BounceButton(
                onTap: () => _showAddChecklistDialog(topic),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    gradient: gradient,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: gradient.colors.first.withValues(alpha: 0.3),
                        blurRadius: 10,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.add, size: 16, color: Colors.white),
                      const SizedBox(width: 4),
                      Text(
                        'Add',
                        style: AppTypography.labelMedium.copyWith(color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          if (topic.checklist.isEmpty)
            BounceButton(
              onTap: () => _showAddChecklistDialog(topic),
              child: Container(
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
                          Icons.add_task,
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
                      Text(
                        'Tap to add your first task',
                        style: AppTypography.bodySmall,
                      ),
                    ],
                  ),
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
      ),
    );
  }

  Widget _buildAiPromptSection(Topic topic, subject, LinearGradient gradient) {
    final prompt = _subjectRepo.generateAiPrompt(topic.title);

    return StaggeredAnimation(
      index: 2,
      child: Column(
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
                      child: BounceButton(
                        onTap: () => _copyToClipboard(prompt),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          decoration: BoxDecoration(
                            gradient: gradient,
                            borderRadius: BorderRadius.circular(14),
                            boxShadow: [
                              BoxShadow(
                                color: gradient.colors.first.withValues(alpha: 0.4),
                                blurRadius: 15,
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
                    BounceButton(
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
      ),
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
      setState(() {
        _showCelebration = true;
      });
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _showCelebration = false;
          });
        }
      });
    }
  }

  void _markAsMastered(Topic topic) {
    HapticFeedback.mediumImpact();
    _subjectRepo.markAsMastered(topic.id);
    _progressRepo.addCompletedTopic();
    _subjectRepo.refreshSubjectCounts();
    setState(() {
      _showCelebration = true;
    });
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _showCelebration = false;
        });
      }
    });
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
                '✨ Add Checklist Item',
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
                  BounceButton(
                    onTap: () {
                      if (controller.text.isNotEmpty) {
                        _subjectRepo.addChecklistItem(topic.id, controller.text);
                        setState(() {});
                        Navigator.pop(context);
                        HapticFeedback.mediumImpact();
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        gradient: AppColors.mainGradient,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: AppColors.getNeonGlow(
                          AppColors.accentPurple,
                          blur: 15,
                          intensity: 0.3,
                        ),
                      ),
                      child: const Text(
                        'Add',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
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
            const Text('✨ Copied to clipboard!'),
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
    Share.share(text, subject: '🤖 AI Learning Prompt');
  }

  void _showMasteredSnackbar() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Text('🎉', style: TextStyle(fontSize: 24)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Topic Mastered!',
                    style: TextStyle(fontWeight: FontWeight.w700),
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
