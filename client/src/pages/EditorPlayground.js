/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

import MarkdownShortcutsExample from '../components/IntflaskEditorTest';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function EditorPlayground(props) {
  return (
    <Layout>
      <Header
        css={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        header
      </Header>
      <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
        <MarkdownShortcutsExample />
      </Content>
    </Layout>
  );
}
