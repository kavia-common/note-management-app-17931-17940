import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedInput } from '../../components/ThemedInput';
import { ThemedButton } from '../../components/ThemedButton';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  onSignupSuccess: () => void;
  goToLogin: () => void;
};

const SignupScreen: React.FC<Props> = ({ onSignupSuccess, goToLogin }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Start managing your notes</Text>

        <View style={styles.spacer} />
        <ThemedInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <View style={{ height: 12 }} />
        <ThemedInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <View style={{ height: 20 }} />
        <ThemedButton title="Sign Up" onPress={onSignupSuccess} />
        <View style={{ height: 12 }} />
        <TouchableOpacity onPress={goToLogin}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  form: { width: '100%' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, marginTop: 8 },
  spacer: { height: 24 },
});
