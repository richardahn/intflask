/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space, Divider } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined, SettingOutlined } from '@ant-design/icons';
import { AppLayout, PaddedContent, AppHeader } from '../styles';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Settings(props) {
  return (
    <AppLayout>
      <AppHeader>
        <h2>
          <SettingOutlined /> Settings
        </h2>
      </AppHeader>
      <AppLayout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu mode="inline" defaultSelectedKeys={['0']}>
            <Menu.Item key="0">Profile</Menu.Item>
            <Menu.Item key="1">Teacher Signup</Menu.Item>
          </Menu>
        </Sider>
        <PaddedContent>
          <h2>Profile</h2>
        </PaddedContent>
      </AppLayout>
    </AppLayout>
  );
}
