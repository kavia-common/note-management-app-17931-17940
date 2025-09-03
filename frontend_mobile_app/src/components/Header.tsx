import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ title, onBack, right }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View style={styles.left}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: { width: 32, alignItems: 'flex-start' },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600' },
  right: { width: 32, alignItems: 'flex-end' },
});
