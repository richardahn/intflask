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

export const Feedback = React.forwardRef(function (
  { children, ...props },
  ref,
) {
  return (
    <React.Fragment>
      <div
        {...props}
        css={css`
          position: relative;
          width: 100%;
          .feedback-hover-zone {
            /* Hide initially */
            opacity: 0;
            transition: opacity 0.1s ease-in;

            /* General css */
            width: 4rem;
            padding-left: 0.5rem;

            /* Positioning */
            position: absolute;
            z-index: 1;
            top: 0;
            left: 100%;
            height: 100%;

            /* Important to avoid issue with slate.js */
            user-select: none;

            /* Child positioning */
            display: flex;
            align-items: center;
          }
          &:hover .feedback-hover-zone {
            opacity: 1;
          }
          .feedback-hover-zone:hover {
            opacity: 1;
          }
          .feedback-hover-content {
            color: white;
            text-align: center;
            padding: 0.3rem;
          }
        `}
        ref={ref}
      >
        {children}
        <div className="feedback-hover-zone" contentEditable={false}>
          <div className="feedback-hover-content">
            <Space>
              <Badge count={5}>
                <Tooltip title="Helpful!" color="#eb2f96">
                  <Button shape="circle" icon={<HeartOutlined />} />
                </Tooltip>
              </Badge>

              <Badge count={5}>
                <Tooltip title="Confused?" color="#fa541c">
                  <Button shape="circle" icon={<QuestionOutlined />} />
                </Tooltip>
              </Badge>
              <Popover
                placement="bottomRight"
                title={<span>Comments</span>}
                content={<div>Comments Body</div>}
                trigger="click"
              >
                <Badge count={5}>
                  <Tooltip
                    title="Add a Comment"
                    placement="topRight"
                    color="#08979c"
                  >
                    <Button shape="circle" icon={<CommentOutlined />} />
                  </Tooltip>
                </Badge>
              </Popover>
            </Space>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});
