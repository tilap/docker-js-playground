import 'polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import Site from './Site';

const App = (
  <BrowserRouter>
    <Site />
  </BrowserRouter>
);

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(App, document.getElementById('root'));
  });
};
