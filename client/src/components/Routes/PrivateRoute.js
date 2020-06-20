import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { useSnackbar } from 'notistack';

function PrivateRoute({
  component: Component,
  redirect = '/login',
  auth,
  userNotLoggedIn,
  notLoggedInMessage = 'You are not logged in.',
  ...rest
}) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      enqueueSnackbar(notLoggedInMessage); // Warning: enqueueSnackbar changes state, so must be done outside of rendering
    }
  }, [auth]);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to={redirect} />;
        }
      }}
    />
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
