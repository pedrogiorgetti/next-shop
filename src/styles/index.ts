import { createStitches } from '@stitches/react';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  keyframes,
  theme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray900: '#121214',
      gray800: '#202024',
      gray600: '#666666',
      gray500: '#555555',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e',

      blue600: '#199c95',
      blue500: '#26a69a',
      blue300: '#33c099',
      blue200: '#40d0a6',
      blue100: '#50e0b3',

      red500: '#b04c4c',
      red300: '#d15a5a',
    },
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
});
