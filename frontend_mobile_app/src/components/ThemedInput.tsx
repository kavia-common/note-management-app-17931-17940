import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const ThemedInput: React.FC<TextInputProps> = (props) => {
  const { colors } = useTheme();
  return (
    <TextInput
      placeholderTextColor={colors.inputPlaceholder}
      style={[
        styles.input,
        {
          color: colors.text,
          backgroundColor: colors.inputBg,
          borderColor: colors.border,
        },
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
});
