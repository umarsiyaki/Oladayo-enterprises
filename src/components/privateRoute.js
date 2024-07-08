import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const auth = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated && roles.includes(auth.user.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;