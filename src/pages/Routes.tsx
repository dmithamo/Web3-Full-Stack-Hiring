import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ALL_ROUTES from './_allTheRoutes';

const Routes: FC = () => (
  <BrowserRouter>
    <Switch>
      {ALL_ROUTES.map(({ component: Component, layout: Layout, path }) => (
        <Route
          strict
          exact
          path={path}
          key={path}
          render={() => (
            <Layout>
              <Component />
            </Layout>
          )}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
