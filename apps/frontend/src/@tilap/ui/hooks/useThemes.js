import { useContext } from 'react';
import ThemesContext from '../contexts/themes/ThemesContext';

const useThemes = () => {
  const { currentThemeId, setTheme, themesIds } = useContext(ThemesContext);
  return { currentThemeId, setTheme, themesIds };
};

export default useThemes;
