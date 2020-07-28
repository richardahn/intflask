/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Layout, Typography } from 'antd';
const { Footer } = Layout;
const { Text } = Typography;

const currentYear = new Date().getFullYear();

function Copyright() {
  return <Text type="secondary">© {currentYear} Copyright</Text>;
}
export default function IntflaskFooter() {
  return (
    <Footer
      css={css`
        display: flex;
        justify-content: center;
        background-color: white;
      `}
    >
      <Copyright />
    </Footer>
  );
}
