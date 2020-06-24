/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

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
          display: inline-block;

          .feedback-hover {
            visibility: hidden;
            width: 120px;
            background-color: black;
            color: white;
            text-align: center;
            padding: 5px 0;

            position: absolute;
            z-index: 1;
            top: -5px;
            left: 100%;
          }

          &:hover .feedback-hover {
            visibility: visible;
          }

          .feedback-hover:hover {
            visibility: visible;
          }
        `}
        ref={ref}
      >
        {children}
        <div
          className="feedback-hover"
          contentEditable={false}
          css={{ userSelect: 'none' }}
        >
          Overlay
        </div>
      </div>
    </React.Fragment>
  );
});
