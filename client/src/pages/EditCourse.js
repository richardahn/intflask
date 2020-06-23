/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Layout,
  Col,
  Row,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  notification,
  PageHeader,
  InputNumber,
  Menu,
  List,
  Avatar,
} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  GoogleOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Content, Header, Sider } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;

function MenuBlock({ children }) {
  return (
    <li css={{ display: 'flex', justifyContent: 'center' }}>{children}</li>
  );
}

const mainHeaderHeight = 64;
const pageHeaderHeight = 72;
const statusBarHeight = 24;

const courseSidebarWidth = 200;

// TODO: Course in database has bool that indicates whether course is available for public
export default function EditCourse({ match, history }) {
  const { courseId, pageId } = match.params;
  const onBack = useCallback(() => history.goBack(), [history]);

  const courseLayout = [
    {
      name: 'Topic 1',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 2',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Review',
    },
    {
      name: 'Topic 3',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
    {
      name: 'Topic 4',
      children: [
        { name: 'Subtopic 1' },
        { name: 'Subtopic 2' },
        { name: 'Subtopic 3' },
        { name: 'Subtopic 4' },
      ],
    },
  ];

  const [collapsedTopic, setCollapsedTopic] = useState(false);
  const onCollapseTopic = useCallback(
    (collapsed) => setCollapsedTopic(collapsed),
    [setCollapsedTopic],
  );

  const [collapsedPage, setCollapsedPage] = useState(false);
  const onCollapsePage = useCallback(
    (collapsed) => setCollapsedPage(collapsed),
    [setCollapsedPage],
  );

  return (
    <React.Fragment>
      <PageHeader
        css={{
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          top: `${mainHeaderHeight}px`,
        }}
        className="site-page-header"
        onBack={onBack}
        title="Edit Course"
        subTitle="Course 777"
      />
      <div
        css={{
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: 1,
          height: `${statusBarHeight}px`,
          width: '100%',
          top: `${mainHeaderHeight + pageHeaderHeight}px`,
        }}
      >
        Toolbar
      </div>
      <Layout>
        <div
          theme="light"
          width={courseSidebarWidth}
          css={{
            height: `calc(100vh - ${
              mainHeaderHeight + pageHeaderHeight + statusBarHeight
            }px)`,
          }}
        >
          <div css={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedTopic}
              onCollapse={onCollapseTopic}
              width={courseSidebarWidth}
            ></Sider>
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedPage}
              onCollapse={onCollapsePage}
              width={courseSidebarWidth}
            ></Sider>
            <div
              css={{
                height: `calc(100vh - ${
                  mainHeaderHeight + pageHeaderHeight + statusBarHeight
                }px)`,
                position: 'fixed',
                left: 0,
                top: `${
                  mainHeaderHeight + pageHeaderHeight + statusBarHeight
                }px`,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Sider
                theme="light"
                collapsible
                collapsed={collapsedTopic}
                onCollapse={onCollapseTopic}
                width={courseSidebarWidth}
                css={{
                  overflow: 'auto',
                }}
              >
                <Menu theme="light">
                  {courseLayout.map((item, index) => (
                    <Menu.Item key={index}>{item.name}</Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Sider
                theme="light"
                collapsible
                collapsed={collapsedPage}
                onCollapse={onCollapsePage}
                width={courseSidebarWidth}
                css={{
                  overflow: 'auto',
                }}
              >
                <Menu theme="light">
                  {courseLayout.map((item, index) => (
                    <Menu.Item key={index}>{item.name}</Menu.Item>
                  ))}
                </Menu>
              </Sider>
            </div>
          </div>
        </div>
        <Layout>
          <Content
            css={{
              backgroundColor: 'white',
              padding: '0 3rem',
            }}
          >
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
            hello
            <br />
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
