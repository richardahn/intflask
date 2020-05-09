/** @jsx jsx */
import { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import classnames from 'classnames';
import { css, jsx } from '@emotion/core';
import PersonIcon from '@material-ui/icons/Person';

const googleButtonStyle = css`
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  display: inline-block;
  max-width: 195px;
  margin-top: 50px;
  border: 0;
  padding: 0 18px;
  text-align: left;
  width: 100%;
  height: 37px;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: 'liga' on;
  color: rgba(0, 0, 0, 0.84) !important;
  fill: rgba(0, 0, 0, 0.84) !important;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.2);
  font: inherit;
  outline: none;
`;
const googleSvgIconStyle = css`
  vertical-align: middle;
  fill: rgba(0, 0, 0, 0.54);
  padding-right: 4px;
  height: 37px;
  display: inline-block;
`;
function GoogleLoginButton(props) {
  return (
    <a href="/auth/google" className="button" css={googleButtonStyle}>
      <div>
        <span className="svgIcon t-popup-svg" css={googleSvgIconStyle}>
          <svg
            className="svgIcon-use"
            width="25"
            height="37"
            viewBox="0 0 25 25"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                fill="#4285F4"
              />
              <path
                d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                fill="#34A853"
              />
              <path
                d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                fill="#FBBC05"
              />
              <path
                d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                fill="#EA4335"
              />
            </g>
          </svg>
        </span>
        <span className="button-label">Sign in with Google</span>
      </div>
    </a>
  );
}

function LoginForm({ onSubmit, onInputChange, email, password, errors }) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Box style={{ width: '400px' }}>
        <Box>
          <TextField
            onChange={onInputChange}
            value={email}
            error={!!errors.email || !!errors.emailnotfound}
            label="Email"
            id="email"
            type="email"
            fullWidth
            margin="normal"
            className={classnames({
              invalid: errors.email || errors.emailnotfound,
            })}
          />
          <Typography
            variant="caption"
            style={{ display: 'block', color: 'red' }}
          >
            {errors.email}
            {errors.emailnotfound}
          </Typography>
        </Box>
        <Box>
          <TextField
            onChange={onInputChange}
            value={password}
            error={!!errors.password}
            label="Password"
            id="password"
            fullWidth
            type="password"
            className={classnames({
              invalid: errors.password || errors.passwordincorrect,
            })}
          />
          <Typography
            variant="caption"
            style={{ display: 'block', color: 'red' }}
          >
            {errors.password}
            {errors.passwordincorrect}
          </Typography>
        </Box>
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
