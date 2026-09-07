import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/config/app_config.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_theme.dart';
import '../../../data/repositories/progress_repository.dart';

/// Profile Screen - Settings & Stats
class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  final _progressRepo = ProgressRepository();

  @override
  Widget build(BuildContext context) {
    final progress = _progressRepo.getProgress();
    final achievements = _progressRepo.getAllAchievements();
    final unlockedCount = achievements.where((a) => a.unlocked).length;

    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppTheme.screenPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Profile', style: AppTypography.heading1),
              const SizedBox(height: AppTheme.spacingLg),

              // Profile card
              _buildProfileCard(progress, unlockedCount, achievements.length),
              const SizedBox(height: AppTheme.spacingLg),

              // Developer & Demo Mode Section
              if (AppConfig.enableDevTools) ...[
                _buildDeveloperSection(),
                const SizedBox(height: AppTheme.spacingLg),
              ],

              // Settings sections
              _buildSettingsSection(),
              const SizedBox(height: AppTheme.spacingLg),

              // About section
              _buildAboutSection(),
              const SizedBox(height: AppTheme.spacingXxl),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfileCard(progress, int unlockedCount, int totalAchievements) {
    return Container(
      padding: const EdgeInsets.all(AppTheme.cardPadding),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.accentSuccess.withOpacity(0.2),
            AppColors.cardBackground,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Row(
            children: [
              // Avatar
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  gradient: AppColors.fireGradient,
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    progress.userName.isNotEmpty
                        ? progress.userName[0].toUpperCase()
                        : '?',
                    style: AppTypography.heading1.copyWith(
                      color: AppColors.primaryBackground,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: AppTheme.spacingMd),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      progress.userName,
                      style: AppTypography.heading2,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Learning since ${_formatDate(progress.createdAt)}',
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: const Icon(Icons.edit),
                color: AppColors.textSecondary,
                onPressed: () => _showEditNameDialog(progress),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingLg),
          const Divider(),
          const SizedBox(height: AppTheme.spacingMd),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatColumn('🔥', '${progress.streak}', 'Day Streak'),
              _buildStatColumn('📚', '${progress.totalTopicsCompleted}', 'Topics'),
              _buildStatColumn('🏆', '$unlockedCount/$totalAchievements', 'Badges'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatColumn(String icon, String value, String label) {
    return Column(
      children: [
        Text(icon, style: const TextStyle(fontSize: 24)),
        const SizedBox(height: 4),
        Text(value, style: AppTypography.stats),
        Text(label, style: AppTypography.caption),
      ],
    );
  }

  Widget _buildSettingsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Settings', style: AppTypography.heading4),
        const SizedBox(height: AppTheme.spacingMd),
        _buildSettingsTile(
          icon: Icons.flag_outlined,
          title: 'Daily Goal',
          subtitle: '3 topics per day',
          onTap: () => _showDailyGoalDialog(),
        ),
        _buildSettingsTile(
          icon: Icons.notifications_outlined,
          title: 'Notifications',
          subtitle: 'Study reminders',
          onTap: () {},
        ),
        _buildSettingsTile(
          icon: Icons.backup_outlined,
          title: 'Backup & Restore',
          subtitle: 'Export/Import data',
          onTap: () {},
        ),
        _buildSettingsTile(
          icon: Icons.delete_outline,
          title: 'Reset Progress',
          subtitle: 'Clear all data',
          textColor: Colors.red,
          onTap: () => _showResetDialog(),
        ),
      ],
    );
  }

  Widget _buildSettingsTile({
    required IconData icon,
    required String title,
    required String subtitle,
    Color? textColor,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppTheme.spacingSm),
      decoration: BoxDecoration(
        color: AppColors.cardBackground,
        borderRadius: BorderRadius.circular(AppTheme.buttonRadius),
        border: Border.all(color: AppColors.border),
      ),
      child: ListTile(
        leading: Icon(icon, color: textColor ?? AppColors.textSecondary),
        title: Text(
          title,
          style: AppTypography.body.copyWith(color: textColor),
        ),
        subtitle: Text(
          subtitle,
          style: AppTypography.caption,
        ),
        trailing: Icon(
          Icons.chevron_right,
          color: AppColors.textTertiary,
        ),
        onTap: onTap,
      ),
    );
  }

  Widget _buildDeveloperSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.developer_mode, color: AppColors.accentWarning, size: 20),
            const SizedBox(width: 8),
            Text(
              'Developer & Demo Tools',
              style: AppTypography.heading4.copyWith(color: AppColors.accentWarning),
            ),
          ],
        ),
        const SizedBox(height: AppTheme.spacingMd),
        Container(
          padding: const EdgeInsets.all(AppTheme.cardPadding),
          decoration: BoxDecoration(
            color: AppColors.cardBackground,
            borderRadius: BorderRadius.circular(AppTheme.cardRadius),
            border: Border.all(
              color: AppColors.accentWarning.withValues(alpha: 0.3),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Branch: dev • ${AppConfig.environmentName}',
                style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Wrap(
                spacing: AppTheme.spacingSm,
                runSpacing: AppTheme.spacingSm,
                children: [
                  ActionChip(
                    avatar: const Icon(Icons.local_fire_department, size: 16, color: AppColors.streakFire),
                    label: const Text('+3 Streak (Demo)'),
                    backgroundColor: AppColors.tertiaryBackground,
                    onPressed: () async {
                      await _progressRepo.updateStreak();
                      await _progressRepo.updateStreak();
                      await _progressRepo.updateStreak();
                      if (mounted) {
                        setState(() {});
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Demo: Streak incremented by +3')),
                        );
                      }
                    },
                  ),
                  ActionChip(
                    avatar: const Icon(Icons.check_circle_outline, size: 16, color: AppColors.accentInfo),
                    label: const Text('+1 Topic Done (Demo)'),
                    backgroundColor: AppColors.tertiaryBackground,
                    onPressed: () async {
                      await _progressRepo.addCompletedTopic();
                      if (mounted) {
                        setState(() {});
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Demo: +1 topic completed')),
                        );
                      }
                    },
                  ),
                  ActionChip(
                    avatar: const Icon(Icons.refresh, size: 16, color: AppColors.accentSuccess),
                    label: const Text('Reset Demo Data'),
                    backgroundColor: AppColors.tertiaryBackground,
                    onPressed: () {
                      _progressRepo.resetAllProgress();
                      if (mounted) {
                        setState(() {});
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Demo data reinitialized')),
                        );
                      }
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildAboutSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('About', style: AppTypography.heading4),
        const SizedBox(height: AppTheme.spacingMd),
        Container(
          padding: const EdgeInsets.all(AppTheme.cardPadding),
          decoration: BoxDecoration(
            color: AppColors.cardBackground,
            borderRadius: BorderRadius.circular(AppTheme.cardRadius),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      gradient: AppColors.successGradient,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Text(
                        'G',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primaryBackground,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: AppTheme.spacingMd),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Gudy', style: AppTypography.heading4),
                        Text(
                          'Version ${AppConfig.appVersion}',
                          style: AppTypography.caption,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Text(
                'Map Your Mastery. Master Your Goals.',
                style: AppTypography.body.copyWith(
                  color: AppColors.textSecondary,
                  fontStyle: FontStyle.italic,
                ),
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Text(
                '© 2024 Gudy. All rights reserved.',
                style: AppTypography.caption,
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _showEditNameDialog(progress) {
    final controller = TextEditingController(text: progress.userName);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text('Edit Name'),
        content: TextField(
          controller: controller,
          autofocus: true,
          decoration: const InputDecoration(
            hintText: 'Enter your name',
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
                _progressRepo.updateUserName(controller.text);
                setState(() {});
                Navigator.pop(context);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showDailyGoalDialog() {
    final progress = _progressRepo.getProgress();
    int selectedGoal = progress.dailyGoal;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: AppColors.cardBackground,
          title: const Text('Daily Goal'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                '$selectedGoal topics per day',
                style: AppTypography.heading2.copyWith(
                  color: AppColors.accentSuccess,
                ),
              ),
              const SizedBox(height: AppTheme.spacingMd),
              Slider(
                value: selectedGoal.toDouble(),
                min: 1,
                max: 10,
                divisions: 9,
                activeColor: AppColors.accentSuccess,
                onChanged: (value) {
                  setDialogState(() {
                    selectedGoal = value.toInt();
                  });
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                _progressRepo.updateDailyGoal(selectedGoal);
                setState(() {});
                Navigator.pop(context);
              },
              child: const Text('Save'),
            ),
          ],
        ),
      ),
    );
  }

  void _showResetDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.cardBackground,
        title: const Text('Reset Progress?'),
        content: const Text(
          'This will delete all your progress, achievements, and streak. This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
            ),
            onPressed: () {
              _progressRepo.resetAllProgress();
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Progress reset successfully')),
              );
            },
            child: const Text('Reset'),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return '${months[date.month - 1]} ${date.year}';
  }
}
