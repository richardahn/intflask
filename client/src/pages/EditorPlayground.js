/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import IntflaskEditor from '../components/IntflaskEditor';

import MarkdownShortcutsExample from '../components/IntflaskEditorTest';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function EditorPlayground(props) {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text:
            'The editor gives you full control over the logic you can add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
        },
      ],
    },
  ]);
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
        <IntflaskEditor value={value} onChange={setValue} />
      </Content>
    </Layout>
  );
}
