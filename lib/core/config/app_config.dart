/// Application Environment Configuration
enum AppEnvironment {
  production,
  developer,
}

/// Global Application Configuration for Developer & Demo Mode
class AppConfig {
  static const AppEnvironment environment = AppEnvironment.developer;
  static const bool isDevMode = true;
  static const bool showDebugBanner = false;
  static const String appVersion = '1.0.0-dev+1';
  static const String environmentName = 'Developer & Demo Mode';

  /// Check whether demo tools and debug overlays should be available
  static bool get enableDevTools => isDevMode;
}
