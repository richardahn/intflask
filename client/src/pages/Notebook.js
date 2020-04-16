import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';
import classnames from 'classnames';
import M from 'materialize-css';
import Editor from '../components/Editor';

class Notebook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h4>Editor</h4>
              <Editor />
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Maps store state to props
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notebook);
