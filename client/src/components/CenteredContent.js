/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Layout } from 'antd';
const { Content } = Layout;

export default function CenteredContent({ children, ...props }) {
  return (
    <Content
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Content>
  );
}
