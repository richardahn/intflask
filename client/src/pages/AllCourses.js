/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Menu, Typography, Row, Col, List, Space, Avatar } from 'antd';
import {
  GoogleOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Courses({ courses }) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={courses}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(course) => (
        <List.Item
          key={course.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a>{course.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team."
          />
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </List.Item>
      )}
    />
  );
}

function convertFormat(courses) {
  return courses.map((course) => ({
    title: course.courseName,
  }));
}

export default function AllCourses(props) {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    axios
      .get('/api/courses')
      .then((response) => response.data)
      .then(convertFormat)
      .then((courses) => setCourses(courses));
  }, []);

  return (
    <Layout>
      <Header css={{ backgroundColor: 'white' }}>
        <Title level={4}>All Courses</Title>
      </Header>
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu mode="inline">
            <Menu.Item key="0" disabled>
              Filter
            </Menu.Item>
            <Menu.Item key="1">
              <GoogleOutlined />
              <Text>Option 1</Text>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
            {courses && <Courses courses={courses} />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
