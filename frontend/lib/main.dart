import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'core/router/app_router.dart';

void main() {
  runApp(
    // ProviderScope stores the state of all Riverpod providers
    const ProviderScope(
      child: KimeliaLumoraApp(),
    ),
  );
}

class KimeliaLumoraApp extends StatelessWidget {
  const KimeliaLumoraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Kimelia Lumora',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system, // Adapts to device dark/light mode automatically
      routerConfig: appRouter,
    );
  }
}