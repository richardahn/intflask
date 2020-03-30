import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';

// todo: Should be called landing page

const WelcomeButtonCss = css`
  width: 140px;
  border-radius: 3px;
  letter-spacing: 1.5px;
`;

class Welcome extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <>
        <div style={{ height: '75vh' }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                Welcome to <b>Solace</b>
              </h4>
              <p className="flow-text grey-text text-darken-1">
                Find a mental help counselor now
              </p>
              <br />
              <div className="col s6">
                <Link
                  to="/login"
                  css={WelcomeButtonCss}
                  className="btn btn-large hoverable waves-effect waves-light blue accent-3"
                >
                  Login
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/signup"
                  css={WelcomeButtonCss}
                  className="btn btn-large hoverable waves-effect waves-light white black-text"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Welcome);
