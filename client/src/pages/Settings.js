/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space, Divider } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined, SettingOutlined } from '@ant-design/icons';
import { AppLayout, PaddedContent, AppHeader } from '../styles';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

function Profile() {
  return <h2>Profile</h2>;
}
function Tutorials() {
  return <h2>Tutorials</h2>;
}

export default function Settings(props) {
  const [selectedKey, setSelectedKey] = useState('profile');

  let body;
  switch (selectedKey) {
    case 'profile':
      body = <Profile />;
      break;
    case 'tutorials':
      body = <Tutorials />;
      break;
  }
  return (
    <AppLayout>
      <AppHeader>
        <h2>
          <SettingOutlined /> Settings
        </h2>
      </AppHeader>
      <AppLayout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="tutorials">Tutorials</Menu.Item>
          </Menu>
        </Sider>
        <PaddedContent>{body}</PaddedContent>
      </AppLayout>
    </AppLayout>
  );
}
