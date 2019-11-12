import React from 'react';
import PropTypes from 'prop-types';
import { useThemes } from '../../';
import ThemeSelectorComponent from '../../components/ThemeSelector/ThemeSelector';

const ThemeSelector = ({ color, helpText, onThemeSelected }) => {
  const { currentThemeId, themesIds, setTheme } = useThemes();
  const handleSetTheme = id => {
    setTheme(id);
    onThemeSelected && onThemeSelected(id);
  };
  return (
    <ThemeSelectorComponent
      color={color}
      helpText={helpText}
      currentThemeId={currentThemeId}
      themesIds={themesIds}
      setTheme={handleSetTheme}
    />
  );
};

ThemeSelector.propTypes = {
  color: PropTypes.string,
  helpText: PropTypes.string,
  onThemeSelected: PropTypes.func,
};

ThemeSelector.defaultProps = {
  color: 'default',
};

export default ThemeSelector;
