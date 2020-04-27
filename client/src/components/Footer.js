import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';

const currentYear = new Date().getFullYear();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      © {currentYear} Copyright
    </Typography>
  );
}
class Footer extends Component {
  render() {
    return (
      <Box p={2}>
        <Copyright />
      </Box>
    );
  }
}
export default Footer;
