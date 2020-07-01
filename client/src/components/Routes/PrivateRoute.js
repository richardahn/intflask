import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { message } from 'antd';

function PrivateRoute({
  component: Component,
  redirect = '/login',
  auth,
  userNotLoggedIn,
  notLoggedInMessage = 'You are not logged in.',
  ...rest
}) {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      message.error(notLoggedInMessage);
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
