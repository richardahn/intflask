/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space, Divider } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined, SettingOutlined } from '@ant-design/icons';
import { AppLayout, PaddedContent, AppHeader } from '../styles';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

function PaymentOptions() {
  return (
    <div>
      <h2>Payment Options</h2>
    </div>
  );
}
export default function Settings(props) {
  const [selectedKey, setSelectedKey] = useState('payment');

  let body;
  switch (selectedKey) {
    case 'payment':
      body = <PaymentOptions />;
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
            <Menu.Item key="payment">Payment Options</Menu.Item>
          </Menu>
        </Sider>
        <PaddedContent>{body}</PaddedContent>
      </AppLayout>
    </AppLayout>
  );
}
