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

/// Main Shell - Bottom Navigation
class MainShell extends StatefulWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;

  final _routes = ['/', '/learn', '/progress', '/practice', '/profile'];

  @override
  Widget build(BuildContext context) {
    // Update current index based on location
    final location = GoRouterState.of(context).uri.path;
    _currentIndex = _routes.indexOf(location);
    if (_currentIndex < 0) _currentIndex = 0;

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppColors.secondaryBackground,
          border: Border(
            top: BorderSide(
              color: AppColors.border,
              width: 1,
            ),
          ),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 64,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.home_outlined, Icons.home, 'Home'),
                _buildNavItem(1, Icons.menu_book_outlined,
                    Icons.menu_book, 'Learn'),
                _buildNavItem(
                    2, Icons.bar_chart_outlined, Icons.bar_chart, 'Progress'),
                _buildNavItem(
                    3, Icons.quiz_outlined, Icons.quiz, 'Practice'),
                _buildNavItem(
                    4, Icons.person_outline, Icons.person, 'Profile'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(
      int index, IconData icon, IconData activeIcon, String label) {
    final isSelected = _currentIndex == index;

    return Expanded(
      child: InkWell(
        onTap: () {
          setState(() {
            _currentIndex = index;
          });
          context.go(_routes[index]);
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              decoration: BoxDecoration(
                color: isSelected
                    ? AppColors.accentSuccess.withOpacity(0.15)
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Icon(
                isSelected ? activeIcon : icon,
                color: isSelected
                    ? AppColors.accentSuccess
                    : AppColors.textTertiary,
                size: 24,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                color: isSelected
                    ? AppColors.accentSuccess
                    : AppColors.textTertiary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
