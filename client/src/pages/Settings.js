/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Settings(props) {
  return (
    <Layout>
      <Header css={{ backgroundColor: 'white' }}>
        <Title level={4}>Settings</Title>
      </Header>
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu mode="inline" defaultSelectedKeys={['0']}>
            <Menu.Item key="0">Profile</Menu.Item>
            <Menu.Item key="1">Teacher Signup</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header css={{ backgroundColor: 'white' }}>Profile Settings</Header>
          <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
            Body
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
