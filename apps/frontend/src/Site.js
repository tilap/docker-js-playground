import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { ThemesProvider, ThemesContext, useLocalStorage } from '@tilap/ui';
import themes from './themes';
import App from './App';
import 'typeface-roboto';

const Site = () => {
  const [theme] = useLocalStorage('app-theme', 'light');
  return (
    <ThemesProvider default={theme} config={themes}>
      <ThemesContext.Consumer>
        {({ currentTheme }) => (
          <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        )}
      </ThemesContext.Consumer>
    </ThemesProvider>
  );
};

export default Site;
