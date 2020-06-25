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

function BadgeTooltipButton({
  count,
  badgeColor,
  buttonColor,
  icon,
  ...props
}) {
  return (
    <Badge
      count={count}
      css={css`
        sup {
          background-color: ${badgeColor};
        }
      `}
      {...props}
    >
      <Tooltip
        title="Helpful!"
        color={buttonColor}
        css={css`
          &:hover {
            color: ${buttonColor};
            border-color: ${buttonColor};
          }
        `}
      >
        <Button shape="circle" icon={icon} />
      </Tooltip>
    </Badge>
  );
}

const FeedbackContent = function ({
  loveCount,
  confusingCount,
  comments,
  width,
}) {
  return (
    <div
      css={css`
        /* General css */
        width: ${width}px;
        padding: 0 0.5rem;

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
      `}
      contentEditable={false}
    >
      <div
        css={css`
          color: white;
          text-align: center;
          padding: 0.3rem;
        `}
      >
        <Space>
          <BadgeTooltipButton
            css={css`
              visibility: ${loveCount !== 0 ? 'visible' : 'hidden'};
            `}
            count={loveCount}
            badgeColor="#fa541c"
            buttonColor="#eb2f96"
            icon={<HeartOutlined />}
          />

          <BadgeTooltipButton
            css={css`
              visibility: ${confusingCount !== 0 ? 'visible' : 'hidden'};
            `}
            count={confusingCount}
            badgeColor="#fa541c"
            buttonColor="#fa541c"
            icon={<QuestionOutlined />}
          />
          <Popover
            css={css`
              visibility: ${(comments?.length ?? 0) !== 0
                ? 'visible'
                : 'hidden'};
            `}
            placement="bottomRight"
            title={<span>Comments</span>}
            content={<div>Comments Body</div>}
            trigger="click"
          >
            <BadgeTooltipButton
              count={comments?.length ?? 0}
              badgeColor="#fa541c"
              buttonColor="#08979c"
              icon={<CommentOutlined />}
            />
          </Popover>
        </Space>
      </div>
    </div>
  );
};
const Feedback = React.forwardRef(function (
  { children, width, ...props },
  ref,
) {
  return (
    <React.Fragment>
      <div
        {...props}
        css={css`
          position: relative;
          width: 100%;
        `}
        ref={ref}
      >
        {children}
        <FeedbackContent
          loveCount={10}
          confusingCount={15}
          comments={[]}
          width={width}
        />
      </div>
    </React.Fragment>
  );
});

const withFeedback = (BaseComponent, width) => ({ children, ...props }) => (
  <Feedback width={width}>
    <BaseComponent {...props}>{children}</BaseComponent>
  </Feedback>
);
export default withFeedback;
