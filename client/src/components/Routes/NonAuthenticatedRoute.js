import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class NonAuthenticatedRoute extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { component: Component, redirect = '/', auth, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!auth.isAuthenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to={redirect} />;
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NonAuthenticatedRoute);
