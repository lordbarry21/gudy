/// App-wide constants
class AppConstants {
  AppConstants._();

  // ============================================
  // APP INFO
  // ============================================

  static const String appName = 'Gudy';
  static const String appTagline = 'Map Your Mastery. Master Your Goals.';
  static const String appVersion = '1.0.0';

  // ============================================
  // SUBJECT IDs
  // ============================================

  static const String subjectMatematikaOSN = 'matematika_osn';
  static const String subjectTKAMatematika = 'tka_matematika';
  static const String subjectBahasaIndonesia = 'bahasa_indonesia';
  static const String subjectBahasaInggris = 'bahasa_inggris';
  static const String subjectSerkom = 'serkom';

  // ============================================
  // MASTERY STATUS
  // ============================================

  static const int masteryNotStarted = 0;
  static const int masteryInProgress = 1;
  static const int masteryMastered = 2;

  // ============================================
  // CHECKLIST DEFAULT ITEMS
  // ============================================

  static const List<String> defaultChecklistItems = [
    'Read theory',
    'Watch video (optional)',
    'Practice problems',
    'Review mistakes',
    'Self-quiz',
  ];

  // ============================================
  // AI PROMPT TEMPLATES
  // ============================================

  static const String aiPromptTemplate = '''Teach me about {TOPIC_NAME} in detail. Include:
1. Key concepts and definitions
2. 3 worked examples with step-by-step solutions
3. Common mistakes and how to avoid them
4. 5 practice problems (varying difficulty)
5. Tips and tricks for solving quickly''';

  static const String aiPromptCompetitionTemplate = '''I'm preparing for {COMPETITION_NAME} (OSN/Sinarmas/Genius Math).
Teach me {TOPIC_NAME} focusing on:
1. Advanced techniques used in competitions
2. Non-standard problem approaches
3. 3 past competition problems with solutions
4. Problem-solving strategies
5. Time-saving tricks''';

  // ============================================
  // STORAGE KEYS
  // ============================================

  static const String hiveBoxProgress = 'progress_box';
  static const String hiveBoxSettings = 'settings_box';
  static const String hiveBoxData = 'data_box';

  // ============================================
  // ACHIEVEMENT IDs
  // ============================================

  static const String achievementFirstStep = 'first_step';
  static const String achievementConsistent = 'consistent';
  static const String achievementMaster = 'master';
  static const String achievementCompetitionReady = 'competition_ready';
  static const String achievementWeekStreak = 'week_streak';
  static const String achievementMonthStreak = 'month_streak';
}
