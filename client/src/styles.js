/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Button, Tooltip, Space, Popover, Badge, Layout } from 'antd';
import {
  QuestionOutlined,
  HeartOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';

const { Content, Header } = Layout;

/* CSS */
// -- Scrollbar --
export const scrollbarCss = css({
  overscrollBehavior: 'contain',
  '::-webkit-scrollbar': {
    width: '3px',
  },
  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

// -- Header --
export const headerCss = css({
  backgroundColor: 'white',
});
export const fixedHeaderCss = css([
  {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
  },
  headerCss,
]);
export function fixedHeaderCssAtHeight(height) {
  return css([
    fixedHeaderCss,
    {
      top: height,
    },
  ]);
}

// -- Content --
export const contentCss = css({
  backgroundColor: 'white',
});
export const paddedContentCss = css([
  contentCss,
  {
    padding: '0 3rem',
  },
]);

/* Styled Components */
export const Blockquote = styled.blockquote`
  margin: 20px 0;
  padding-left: 1.5rem;
  border-left: 5px solid #ee6e73;
`;
export function PaddedContent({ x = 3, children, ...props }) {
  return (
    <Content
      css={{
        padding: `0 ${x}rem`,
      }}
      {...props}
    >
      {children}
    </Content>
  );
}
export const AppLayout = styled(Layout)`
  background-color: white;
`;
export const AppHeader = styled(Header)`
  background-color: white;
`;

export function AppFixedHeader({ top, children, ...props }) {
  return (
    <AppHeader
      css={css`
        position: fixed;
        z-index: 1;
        width: 100%;
        ${top ? `top: ${top}px;` : ''}
      `}
      {...props}
    >
      {children}
    </AppHeader>
  );
}

// export function FixedSider({ top = 0, children, ...props }) {
//   const [collapsed, setCollapsed] = useState(false);
//   return (
//     <React.Fragment>
//       <Sider
//         theme="light"
//         breakpoint="lg"
//         trigger={null}
//         collapsedWidth="0"
//         collapsed={collapsed}
//       ></Sider>
//       <Sider
//         theme="light"
//         breakpoint="lg"
//         collapsedWidth="0"
//         onCollapse={(collapsed) => setCollapsed(collapsed)}
//         css={{
//           height: `calc(100vh - ${top}px)`,
//           position: 'fixed',
//           left: 0,
//           top,
//           zIndex: 1,
//         }}
//       >
//         {children}
//       </Sider>
//     </React.Fragment>
//   );
// }

/* Layout Values */
export const mainHeaderHeight = 64;
export const pageHeaderHeight = 75;
export const statusBarHeight = 24;
export const tutorialSidebarWidth = 200;
