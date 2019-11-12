import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const AsyncPageHome = Loadable({
  loader: () => import(/* webpackChunkName: "pageAnother" */ './pages/PageHome'),
  loading: () => <div>loading another page...</div>,
  modules: ['pageAnother'],
});

const AsyncPageAnother = Loadable({
  loader: () => import(/* webpackChunkName: "pageDefault" */ './pages/PageAnother'),
  loading: () => <div>loading page...</div>,
  modules: ['pageDefault'],
});

const Router = () => (
  <Switch>
    <Route path="/" exact component={AsyncPageHome} />
    <Route path="/another" component={AsyncPageAnother} />
  </Switch>
);

export default Router;
