/** @jsx jsx */
import { css, jsx } from '@emotion/core';

// -- General Imports --
import React, { Component, useCallback, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';

// -- Design --
import { Layout, Menu, Typography, Button } from 'antd';
const { Header } = Layout;

function Logo() {
  return (
    <RouterLink
      to="/"
      css={css`
        font-size: 1rem;
        height: 100%;
        color: black;
        &:hover {
          color: black;
        }
        &:focus {
          color: black;
        }
      `}
    >
      intflask
    </RouterLink>
  );
}

function FixedHeader({ children, ...props }) {
  return <Header {...props}>{children}</Header>;
}

function IntflaskHeader(props) {
  const onLogoutClick = useCallback(
    (event) => {
      event.preventDefault();
      props.logoutUser(props.history);
    },
    [props.logoutUser, props.history],
  );

  const navbarItems = props.auth.isAuthenticated
    ? [
        {
          name: 'Home',
          to: '/',
        },
        {
          name: 'My Courses',
          to: '/my-courses',
        },
        {
          name: 'Notebook',
          to: '/notebook',
        },
        {
          name: 'Admin',
          to: '/admin',
        },
        {
          name: 'Logout',
          to: '',
          onClick: onLogoutClick,
        },
      ]
    : [
        {
          name: 'Home',
          to: '/',
        },
        {
          name: 'Login',
          to: '/login',
        },
        {
          name: 'Signup',
          to: '/signup',
        },
      ];

  return (
    <FixedHeader
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
      `}
    >
      <Logo />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']}>
        {navbarItems.map((item, index) => (
          <Menu.Item key={index}>
            <RouterLink to={item.to} onClick={item.onClick}>
              {item.name}
            </RouterLink>
          </Menu.Item>
        ))}
      </Menu>
    </FixedHeader>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(IntflaskHeader));
