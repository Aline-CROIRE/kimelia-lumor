import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io' show Platform;

// Provider to inject the repository easily anywhere in the app
final authRepositoryProvider = Provider((ref) => AuthRepository());

class AuthRepository {
  // Determine correct localhost based on platform
  String get baseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:5000/api'; // Android Emulator
    } else {
      return 'http://127.0.0.1:5000/api'; // iOS Simulator / Web
    }
  }

  Future<bool> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        
        // Save the JWT token locally
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('jwt_token', data['token']);
        await prefs.setString('user_name', data['name']);
        
        return true;
      }
      return false;
    } catch (e) {
      print('Login Error: $e');
      return false;
    }
  }
}