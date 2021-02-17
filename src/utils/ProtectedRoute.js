import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionSelectors from '../redux/session/sessionSelectors';

const ProtectedRoute = ({ redirectTo, path, ...rest }) => {
  const authenticated = useSelector(state =>
    sessionSelectors.isAuthenticated(state),
  );
  const location = useLocation();

  return authenticated ? (
    <Route {...rest} path={path} />
  ) : (
    <Redirect
      {...rest}
      to={{
        pathname: redirectTo,
        state: {
          from: location,
        },
      }}
    />
  );
};

export default ProtectedRoute;
