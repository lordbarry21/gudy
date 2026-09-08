import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/home/home_screen.dart';
import '../features/learn/learn_screen.dart';
import '../features/learn/subject_detail_screen.dart';
import '../features/learn/topic_detail_screen.dart';
import '../features/progress/progress_screen.dart';
import '../features/practice/practice_screen.dart';
import '../features/profile/profile_screen.dart';
import '../core/theme/app_colors.dart';
import '../core/theme/app_theme.dart';

/// App Router Configuration
final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    // Shell route for bottom navigation
    ShellRoute(
      builder: (context, state, child) {
        return MainShell(child: child);
      },
      routes: [
        GoRoute(
          path: '/',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: HomeScreen(),
          ),
        ),
        GoRoute(
          path: '/learn',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: LearnScreen(),
          ),
        ),
        GoRoute(
          path: '/progress',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: ProgressScreen(),
          ),
        ),
        GoRoute(
          path: '/practice',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: PracticeScreen(),
          ),
        ),
        GoRoute(
          path: '/profile',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: ProfileScreen(),
          ),
        ),
      ],
    ),
    // Detail routes (outside shell)
    GoRoute(
      path: '/learn/:subjectId',
      builder: (context, state) {
        final subjectId = state.pathParameters['subjectId']!;
        return SubjectDetailScreen(subjectId: subjectId);
      },
      routes: [
        GoRoute(
          path: 'topic/:topicId',
          builder: (context, state) {
            final subjectId = state.pathParameters['subjectId']!;
            final topicId = state.pathParameters['topicId']!;
            return TopicDetailScreen(
              subjectId: subjectId,
              topicId: topicId,
            );
          },
        ),
      ],
    ),
  ],
);

/// Main Shell - Bottom Navigation (Modern Design)
class MainShell extends StatefulWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  late AnimationController _animationController;

  final _routes = ['/', '/learn', '/progress', '/practice', '/profile'];

  final _navItems = [
    _NavItem(icon: Icons.home_outlined, activeIcon: Icons.home, label: 'Home'),
    _NavItem(icon: Icons.menu_book_outlined, activeIcon: Icons.menu_book, label: 'Learn'),
    _NavItem(icon: Icons.bar_chart_outlined, activeIcon: Icons.bar_chart, label: 'Progress'),
    _NavItem(icon: Icons.quiz_outlined, activeIcon: Icons.quiz, label: 'Practice'),
    _NavItem(icon: Icons.person_outline, activeIcon: Icons.person, label: 'Profile'),
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Update current index based on location
    final location = GoRouterState.of(context).uri.path;
    _currentIndex = _routes.indexOf(location);
    if (_currentIndex < 0) _currentIndex = 0;

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.backgroundLight,
          border: const Border(
            top: BorderSide(
              color: AppColors.border,
              width: 1,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.08),
              blurRadius: 20,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: SafeArea(
          child: Container(
            height: 72,
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(_navItems.length, (index) {
                return _buildNavItem(index, _navItems[index]);
              }),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, _NavItem item) {
    final isSelected = _currentIndex == index;

    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _currentIndex = index;
          });
          context.go(_routes[index]);
        },
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: AppTheme.animMicro,
          margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
          decoration: BoxDecoration(
            gradient: isSelected ? AppColors.mainGradient : null,
            color: isSelected ? null : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: AppColors.accentPurple.withValues(alpha: 0.3),
                      blurRadius: 12,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isSelected ? item.activeIcon : item.icon,
                color: isSelected ? Colors.white : AppColors.textMuted,
                size: 24,
              ),
              const SizedBox(height: 4),
              Text(
                item.label,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  color: isSelected ? Colors.white : AppColors.textMuted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;

  _NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
  });
}
