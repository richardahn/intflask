/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Spin, Typography, Layout } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Text } = Typography;
const { Content } = Layout;

export default function ErrorContent({ children, ...props }) {
  return (
    <Content
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>
        <CloseCircleOutlined /> {children}
      </Text>
    </Content>
  );
}
