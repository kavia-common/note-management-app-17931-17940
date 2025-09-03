import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, ColorSchemeName } from './colors';

type ThemeContextType = {
  colorScheme: ColorSchemeName;
  colors: typeof Colors.light;
  toggleTheme: () => void;
  setScheme: (scheme: ColorSchemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'app_theme_scheme';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [scheme, setSchemeState] = useState<ColorSchemeName>('light');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          setSchemeState(saved);
        } else {
          const sys = Appearance.getColorScheme();
          setSchemeState(sys === 'dark' ? 'dark' : 'light');
        }
      } catch {
        setSchemeState('light');
      }
    })();
  }, []);

  const setScheme = async (value: ColorSchemeName) => {
    setSchemeState(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => setScheme(scheme === 'light' ? 'dark' : 'light');

  const colors = useMemo(() => (scheme === 'light' ? Colors.light : Colors.dark), [scheme]);

  const value = useMemo(
    () => ({ colorScheme: scheme, colors, toggleTheme, setScheme }),
    [scheme, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// PUBLIC_INTERFACE
export const useTheme = () => {
  /** Get the current theme colors and helpers. */
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
