import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Container, Divider, Typography, Box } from '@material-ui/core';

// todo: Should I make this /profile, or /user?id={id}
// If so, then the profile name has to be based off an api request I make
class Profile extends Component {
  render() {
    const profileName = this.props.auth.user.name;
    return (
      <Container>
        <Box mt={2}>
          <Typography variant="h6">{profileName}</Typography>
          <Divider />
          <Box mt={2}>
            <Typography variant="h6">Statistics</Typography>
            <Typography variant="body2">Some statistics</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Other</Typography>
            <Typography variant="body2">Other stuff</Typography>
          </Box>
        </Box>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
