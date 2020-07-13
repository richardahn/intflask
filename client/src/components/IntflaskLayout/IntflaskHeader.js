/** @jsx jsx */
import { css, jsx } from '@emotion/core';

// -- General Imports --
import React, { Component, useCallback, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';

// -- Design --
import { Layout, Menu, Typography, Button, Input, Space, Dropdown } from 'antd';
import { MoreOutlined, MenuOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Text } = Typography;
function Logo(props) {
  return (
    <RouterLink
      to="/"
      css={css`
        font-size: 1rem;
        height: 100%;
        margin-right: 1rem;
        color: black;
        &:hover {
          color: black;
        }
        &:focus {
          color: black;
        }
      `}
      {...props}
    >
      intflask
    </RouterLink>
  );
}

function FixedHeader({ children, ...props }) {
  return (
    <Header css={{ position: 'fixed', zIndex: 1, width: '100%' }} {...props}>
      {children}
    </Header>
  );
}

function IntflaskHeader({ logoutUser, history, auth }) {
  const onLogoutClick = useCallback(
    (event) => {
      event.preventDefault();
      logoutUser(history);
    },
    [logoutUser, history],
  );

  const navbarItems = auth.isAuthenticated
    ? [
        {
          name: 'Tutorials',
          to: '/tutorials',
        },
        {
          name: 'Purchases',
          to: '/purchases',
        },
        {
          name: 'Create',
          to: '/admin',
        },
        {
          name: 'Settings',
          to: '/settings',
        },
        {
          name: 'Logout',
          to: '',
          onClick: onLogoutClick,
        },
      ]
    : [
        {
          name: 'Tutorials',
          to: '/tutorials',
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
      <Input.Search
        size="large"
        placeholder="Search for a tutorial..."
        css={{ maxWidth: '400px' }}
      />
      <Dropdown
        overlay={
          <Menu theme="light">
            {navbarItems.map((item, index) => (
              <Menu.Item key={index}>
                <RouterLink to={item.to} onClick={item.onClick}>
                  {item.name}
                </RouterLink>
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <Button
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          type="text"
          size="large"
        >
          <MenuOutlined />
        </Button>
      </Dropdown>
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
