import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

type FABProps = {
  onPress: () => void;
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
};

export const FAB: React.FC<FABProps> = ({ onPress, style, icon = 'add' }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.fab,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.cardShadow,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Create new note"
    >
      <Ionicons name={icon} size={26} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});
