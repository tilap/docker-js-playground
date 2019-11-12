import { createContext } from 'react';

const ThemesContext = createContext({
  currentThemeId: '',
  currentTheme: {},
  setTheme: () => null,
  themesIds: [],
});

export default ThemesContext;
