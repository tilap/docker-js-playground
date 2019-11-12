import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import useThemes from './hooks/useThemes';

const ThemeProvider = ({ variant, ...props }) => {
  const { theme, muiThemesConfigs } = useThemes();

  if (!variant) {
    const muiTheme = muiThemesConfigs.get(theme).default;
    return <ThemeProvider {...props} theme={muiTheme} />;
  }

  if (!muiThemesConfigs.get(theme).variants.has(variant)) {
    throw new Error(`Unknown variant ${variant} for theme ${theme}`);
  }

  const muiTheme = muiThemesConfigs.get(theme).variants.get(variant);
  return <MuiThemeProvider {...props} theme={muiTheme} />;
};

ThemeProvider.propTypes = {
  variant: PropTypes.string,
};

export default ThemeProvider;
