/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Spin } from 'antd';

export default function PageSpinner() {
  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <Spin size="large" />
    </div>
  );
}
