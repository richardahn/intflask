/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback } from 'react';
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
  ];

  return (
    <React.Fragment>
      <PageHeader
        css={{ backgroundColor: 'white' }}
        className="site-page-header"
        onBack={onBack}
        title="Edit Course"
        subTitle="Course 777"
      />
      <Header css={{ backgroundColor: 'white' }}>Toolbar</Header>
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu mode="inline">
            <MenuBlock>
              <Text strong css={{ lineHeight: 'initial', height: '40px' }}>
                Course
              </Text>
            </MenuBlock>
            <Menu.Item key="0" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Divider />
            {courseLayout.map((topic, i) => {
              if (topic.children) {
                return (
                  <SubMenu key={i} title={topic.name}>
                    {topic.children.map((subtopic, j) => {
                      return (
                        <Menu.Item key={i + '.' + j}>{subtopic.name}</Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return <Menu.Item key={i}>{topic.name}</Menu.Item>;
              }
            })}
            <MenuBlock>
              <Button icon={<PlusOutlined />}>Add Topic</Button>
            </MenuBlock>
          </Menu>
        </Sider>
        <Layout>
          <Header css={{ backgroundColor: 'white' }}>All Courses</Header>
          <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
            hello
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
