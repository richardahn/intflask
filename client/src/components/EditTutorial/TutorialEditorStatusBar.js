/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { Tag, Space } from 'antd';
import {
  HomeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import saveStates from '../../enums/saveStates';

// -- Redux --
import { connect } from 'react-redux';

// -- Css --
import {
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  AppFixedHeader,
} from '../../styles';

function saveStateToTag(saveState) {
  switch (saveState) {
    case saveStates.MODIFIED:
      return <Tag color="warning">modified</Tag>;
    case saveStates.SAVED:
      return (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          saved
        </Tag>
      );
    case saveStates.SAVING:
      return (
        <Tag color="processing" icon={<SyncOutlined spin />}>
          saving
        </Tag>
      );
    default:
      return (
        <Tag color="default" icon={<SyncOutlined spin />}>
          loading
        </Tag>
      );
  }
}

function TutorialEditorStatusBar({ saveState }) {
  return (
    <AppFixedHeader
      top={mainHeaderHeight + pageHeaderHeight}
      css={{
        height: `${statusBarHeight}px`,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Space css={{ marginRight: '1.5rem' }}>
        <div css={{ minWidth: '100px' }}>{saveStateToTag(saveState)}</div>
      </Space>
    </AppFixedHeader>
  );
}

const mapStateToProps = (state) => ({
  saveState: state.editTutorial.saveState,
});

export default connect(mapStateToProps)(TutorialEditorStatusBar);
