import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { useAuthListener } from './hooks';
import * as ROUTES from './constants/routes';

import { Browse, Home, Signin, Signup } from './views/pages';

export default function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggenInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
          exact
        >
          <Home />
        </IsUserRedirect>

        <IsUserRedirect
          user={user}
          loggenInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}
        >
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggenInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
        >
          <Signup />
        </IsUserRedirect>

        <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
