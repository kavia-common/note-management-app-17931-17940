import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedInput } from '../../components/ThemedInput';
import { ThemedButton } from '../../components/ThemedButton';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  onLoginSuccess: () => void;
  goToSignup: () => void;
};

const LoginScreen: React.FC<Props> = ({ onLoginSuccess, goToSignup }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</Text>

        <View style={styles.spacer} />
        <ThemedInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <View style={{ height: 12 }} />
        <ThemedInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <View style={{ height: 20 }} />
        <ThemedButton title="Sign In" onPress={onLoginSuccess} />
        <View style={{ height: 12 }} />
        <TouchableOpacity onPress={goToSignup}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  form: { width: '100%' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, marginTop: 8 },
  spacer: { height: 24 },
});
