// Basic widget test for Gudy app
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gudy/main.dart';

void main() {
  testWidgets('Gudy app loads correctly', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      const ProviderScope(
        child: GudyApp(),
      ),
    );

    // Verify that the app loads (basic smoke test)
    expect(find.text('Home'), findsWidgets);
  });
}
