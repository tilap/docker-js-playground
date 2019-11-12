import React from 'react';
import Loadable from 'react-loadable';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { ThemeSelector, useLocalStorage } from '@tilap/ui';
import Router from './Router';
import logo from './assets/logo.svg';
import 'typeface-roboto';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <img src={logo} style={{ width: 40, marginRight: 10 }} alt="logo" />
          <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
            My app
          </Typography>
          <div>
            <Button component={NavLink} to="/" exact color="inherit">
              Home
            </Button>
            <Button component={NavLink} to="/another" exact color="inherit">
              Another page
            </Button>
            <ThemeSelector onThemeSelected={setTheme} />
          </div>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Box py={4}>
            <Router />
          </Box>
      </Container>
      </main>
    </>
  );
};

export default withRouter(App);
