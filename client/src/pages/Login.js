/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Button,
} from '@material-ui/core';
import {
  BlackDivider,
  BasicInputField,
  GoogleLoginButton,
} from '../components/basicComponents';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';

function LoginForm({ onSubmit, onInputChange, email, password, errors }) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Box
        css={css`
          width: 400px;
        `}
      >
        <BasicInputField
          onChange={onInputChange}
          value={email}
          error={!!errors.email || !!errors.emailnotfound}
          errorLabels={errors.email || errors.emailnotfound}
          label="Email"
          id="email"
          type="email"
          margin="normal"
        />
        <BasicInputField
          onChange={onInputChange}
          value={password}
          error={!!errors.password}
          errorLabels={errors.password || errors.passwordincorrect}
          label="Password"
          id="password"
          type="password"
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Box>
    </form>
  );
}

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
  // Why put logic here? Because redux maps state to props, so if we want to do something whenever redux sends props here, we would put that logic here
  componentWillReceiveProps(nextProps) {
    // Merge errors from redux with the errors in this react component's state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  render() {
    return (
      <Container component={Box} pt={3}>
        <Paper variant="outlined">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Login</Typography>
                <Typography variant="caption">
                  Don't have an account?{' '}
                  <Link to="/signup" component={RouterLink}>
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoginForm
                  onSubmit={this.onFormSubmit}
                  onInputChange={this.onInputChange}
                  email={this.state.email}
                  password={this.state.password}
                  errors={this.state.errors}
                />
              </Grid>
              <Grid item xs={12}>
                <BlackDivider />
              </Grid>
              <Grid item xs={12}>
                <GoogleLoginButton />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
