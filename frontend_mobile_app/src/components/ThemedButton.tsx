import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
};

export const ThemedButton: React.FC<Props> = ({ title, onPress, variant = 'primary', style }) => {
  const { colors } = useTheme();

  const backgroundColor =
    variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.accent : 'transparent';
  const textColor = variant === 'ghost' ? colors.primary : '#FFFFFF';
  const borderWidth = variant === 'ghost' ? 1 : 0;
  const borderColor = variant === 'ghost' ? colors.primary : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { backgroundColor, borderColor, borderWidth }, style]}
      accessibilityRole="button"
    >
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
});
