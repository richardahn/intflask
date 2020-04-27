import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Typography } from '@material-ui/core';

function Greeting({ user }) {
  return (
    <Typography variant="h5">
      Hello, <b>{user.name.split(' ')[0]}</b>
    </Typography>
  );
}

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container maxWidth="false">
        <Greeting user={user} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
