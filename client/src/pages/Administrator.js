/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Button, Typography, Space, List, Avatar, Tag } from 'antd';
import PageSpinner from '../components/PageSpinner';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Content, Header } = Layout;
const { Title, Text } = Typography;

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}

function CreatedCoursesList({ courses }) {
  console.log(courses);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{ onChange: (page) => console.log(page), pageSize: 3 }}
      dataSource={courses}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(course) => (
        <List.Item
          key={course.slug}
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
              <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <a css={{ marginRight: '1rem' }}>
                    <Text>{course.title}</Text>
                  </a>
                  {course.deployed ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      deployed
                    </Tag>
                  ) : (
                    <Tag icon={<MinusCircleOutlined />} color="default">
                      hidden
                    </Tag>
                  )}
                </div>
                <Space>
                  <Button>View</Button>
                  <RouterLink to={course.editUrl}>
                    <Button>Edit</Button>
                  </RouterLink>
                </Space>
              </div>
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
    editUrl: `/admin/edit-course/${course.slug}`,
    deployed: course.deployed,
  }));
}

export default function Administrator() {
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    axios
      .get('/api/admin/courses')
      .then((response) => response.data)
      .then(convertFormat)
      .then((courses) => setCourses(courses));
  }, []);

  return (
    <Layout>
      <Header css={{ backgroundColor: 'white' }}>
        <Title level={4}>Administrator Dashboard</Title>
      </Header>
      <Content
        css={{
          backgroundColor: 'white',
          padding: '0 3rem',
        }}
      >
        <div>
          <Space align="center">
            <Title level={4} css={{ marginBottom: '0 !important' }}>
              Your Created Courses
            </Title>
            <RouterLink to="/admin/create-course">
              <Button type="primary">Create a Course</Button>
            </RouterLink>
          </Space>
        </div>

        {/* List */}
        {courses ? <CreatedCoursesList courses={courses} /> : <PageSpinner />}
      </Content>
    </Layout>
  );
}
