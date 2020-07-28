/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// -- Components --
import { Layout } from 'antd';
import IntflaskFooter from './IntflaskFooter';
import IntflaskHeader from './IntflaskHeader';

/** Renders the general page layout and general styles/themes */
export default function IntflaskLayout({ children, ...props }) {
  return (
    <Layout
      css={css`
        display: flex;
        min-height: 100vh;
      `}
      {...props}
    >
      <IntflaskHeader>Header</IntflaskHeader>
      <Layout css={{ marginTop: '64px' }}>{children}</Layout>
      <IntflaskFooter>Footer</IntflaskFooter>
    </Layout>
  );
}
