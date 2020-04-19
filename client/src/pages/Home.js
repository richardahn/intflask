import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Greeting({ user }) {
  return (
    <h5>
      Hello, <b>{user.name.split(' ')[0]}</b>
    </h5>
  );
}

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container valign-wrapper" style={{ height: '75vh' }}>
        <div className="row">
          <div
            className="col s12 center-align"
            style={{ marginBottom: '25px' }}
          >
            <Greeting user={user} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
