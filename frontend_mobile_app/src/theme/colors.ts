export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FB',
    text: '#1F2937',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
    primary: '#1976D2', // specified primary
    accent: '#FFCA28', // specified accent
    secondary: '#424242', // specified secondary
    danger: '#EF4444',
    success: '#10B981',
    overlay: 'rgba(0,0,0,0.3)',
    cardShadow: 'rgba(0,0,0,0.06)',
    inputBg: '#FFFFFF',
    inputPlaceholder: '#9CA3AF',
  },
  dark: {
    background: '#0B0F14',
    surface: '#10161D',
    text: '#E5E7EB',
    textSecondary: '#9CA3AF',
    border: '#1F2937',
    primary: '#63A4FF',
    accent: '#FFD95E',
    secondary: '#BDBDBD',
    danger: '#FCA5A5',
    success: '#34D399',
    overlay: 'rgba(0,0,0,0.5)',
    cardShadow: 'rgba(0,0,0,0.5)',
    inputBg: '#0B0F14',
    inputPlaceholder: '#6B7280',
  },
} as const;

export type ColorSchemeName = keyof typeof Colors;
