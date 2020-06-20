/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';
import classnames from 'classnames';
import {
  BlackDivider,
  BasicInputField,
  GoogleLoginButton,
} from '../components/basicComponents';
import {
  Link,
  Box,
  TextField,
  Typography,
  Grid,
  Container,
  Paper,
  Divider,
  Button,
} from '@material-ui/core';

function SignupForm({
  onSubmit,
  onInputChange,
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  errors,
}) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Box
        css={css`
          width: 400px;
        `}
      >
        <BasicInputField
          onChange={onInputChange}
          value={firstName}
          error={!!errors.firstName}
          errorLabels={errors.firstName}
          label="First Name"
          id="firstName"
          type="text"
          margin="normal"
        />
        <BasicInputField
          onChange={onInputChange}
          value={lastName}
          error={!!errors.lastName}
          errorLabels={errors.lastName}
          label="Last Name"
          id="lastName"
          type="text"
          margin="normal"
        />
        <BasicInputField
          onChange={onInputChange}
          value={email}
          error={!!errors.email}
          errorLabels={errors.email}
          label="Email"
          id="email"
          type="email"
          margin="normal"
        />
        <BasicInputField
          onChange={onInputChange}
          value={password}
          error={!!errors.password}
          errorLabels={errors.password}
          label="Password"
          id="password"
          type="password"
          margin="normal"
        />
        <BasicInputField
          onChange={onInputChange}
          value={passwordConfirm}
          error={!!errors.passwordConfirm}
          errorLabels={errors.passwordConfirm}
          label="Confirm Your Password"
          id="passwordConfirm"
          type="password"
          margin="normal"
        />
        <Box>
          <Typography variant="caption">
            By clicking <em>Sign Up</em>, you are agreeing to intflask's{' '}
            <Link href="#">User Agreement</Link>,{' '}
            <Link href="#">Privacy Policy</Link>, and{' '}
            <Link href="#">Cookie Policy</Link>
          </Typography>
        </Box>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </form>
  );
}

class Signup extends Component {
  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
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

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    this.props.signupUser(newUser, () => {
      this.props.history.push('/login');
    });
  }

  componentWillReceiveProps(nextProps) {
    // Mix redux errors with component state errors
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
                <Typography variant="h5">Signup</Typography>
                <Typography variant="caption">
                  Already have an account?{' '}
                  <Link to="/signup" component={RouterLink}>
                    Login
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <SignupForm
                  onSubmit={this.onFormSubmit}
                  onInputChange={this.onInputChange}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  email={this.state.email}
                  password={this.state.password}
                  passwordConfirm={this.state.passwordConfirm}
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

// Maps store state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

/*
Goals: 
- Have validation done in real time
  - (1) Debounce (2) After blur (3) OnKeyDown
- Server must also do validation
- Both validation checks should interact with same error system
*/
