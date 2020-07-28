/** @jsx jsx */
// -- General Imports --
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import { Space, Tag } from 'antd';
import saveStates from '../../enums/saveStates';
// -- Css --
import {
  AppFixedHeader,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
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

export default function TutorialEditorStatusBar({ saveState }) {
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
