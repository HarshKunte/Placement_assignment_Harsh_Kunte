import React from 'react';

export const themes = {
  light: {
    name: 'light',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  dark: {
    name: 'dark',
    backgroundColor: '#333333',
    color: '#ffffff',
  },
};

export const ThemeContext = React.createContext(themes.light);
