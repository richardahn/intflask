/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Button, Tooltip, Space, Popover, Badge } from 'antd';
import {
  QuestionOutlined,
  HeartOutlined,
  CommentOutlined,
} from '@ant-design/icons';

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

export const Blockquote = styled.blockquote`
  margin: 20px 0;
  padding-left: 1.5rem;
  border-left: 5px solid #ee6e73;
`;
