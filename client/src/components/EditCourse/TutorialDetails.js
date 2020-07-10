/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  PageHeader,
  message,
  Layout,
  Typography,
  Button,
  Tag,
  Space,
  Menu,
} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  SettingOutlined,
  CloseOutlined,
} from '@ant-design/icons';

// -- Redux --
import { connect } from 'react-redux';
import {
  setCourse,
  reset,
  setDeployed,
  saveCourse,
  setCourseName,
} from '../../actions/editCourse';

// -- Css --
import {
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  paddedContentCss,
} from '../../styles';
const { Content, Sider } = Layout;
const { Title } = Typography;

function TutorialDetails() {
  const [deployButtonLoading, setDeployButtonLoading] = useState(false);
  const deployButtonOnClick = (deploy) => {
    setDeployed(deploy);
    setDeployButtonLoading(true);
    saveCourse(
      () => setDeployButtonLoading(false),
      () => setDeployButtonLoading(false),
    );
  };
  return (
    <Layout>
      <Sider
        css={{
          marginTop: `${pageHeaderHeight}px`,
          backgroundColor: 'white',
        }}
      >
        <Menu defaultSelectedKeys={['1']} theme="light" mode="inline">
          <Menu.Item key="1">Settings</Menu.Item>
          <Menu.Item key="2">Deploy</Menu.Item>
        </Menu>
      </Sider>
      <Content
        css={[
          {
            marginTop: `${pageHeaderHeight}px`,
          },
          paddedContentCss,
        ]}
      >
        Hello
        {true ? (
          <Button
            size="small"
            danger
            icon={<EyeInvisibleOutlined />}
            css={{ fontSize: '0.7rem' }}
            key="hideButton"
            loading={deployButtonLoading}
            onClick={() => deployButtonOnClick(false)}
          >
            Hide Course
          </Button>
        ) : (
          <Button
            size="small"
            icon={<EyeOutlined />}
            css={{ fontSize: '0.7rem' }}
            key="deployButton"
            loading={deployButtonLoading}
            onClick={() => deployButtonOnClick(true)}
          >
            Deploy Course
          </Button>
        )}
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  courseDeployed: state.editCourse.course?.deployed,
  courseName: state.editCourse.course?.courseName,
});
const mapDispatchToProps = {
  setCourse,
  reset,
  setDeployed,
  saveCourse,
  setCourseName,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialDetails);
