/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Menu, Typography, Row, Col, List, Space, Avatar } from 'antd';
import {
  GoogleOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import PageSpinner from '../components/PageSpinner';

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
            title={
              <RouterLink to={`/tutorial-previews/${course.slug}`}>
                {course.title}
              </RouterLink>
            }
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
    slug: course.slug,
  }));
}

export default function Tutorials(props) {
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
      <Sider theme="light" breakpoint="lg" collapsedWidth="0">
        <div css={{ padding: '1rem 2rem' }}>Hello Sidebar</div>
      </Sider>
      <Layout>
        <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
          {courses ? <Courses courses={courses} /> : <PageSpinner />}
        </Content>
      </Layout>
    </Layout>
  );
}
