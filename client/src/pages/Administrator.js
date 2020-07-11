/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Space,
  List,
  Avatar,
  Tag,
  Breadcrumb,
  Tooltip,
} from 'antd';
import PageSpinner from '../components/PageSpinner';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { AppLayout, PaddedContent, AppHeader } from '../styles';
import FloatingActionButton from '../components/FloatingActionButton';

const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}

function CreatedTutorial({ course }) {
  return (
    <List.Item
      key={course.slug}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
      ]}
    >
      <List.Item.Meta
        css={css`
          .ant-list-item-meta-title {
            margin-bottom: 0;
          }
        `}
        title={
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <RouterLink
                css={{ marginRight: '1rem' }}
                to={`/tutorial-dashboard/${course.slug}`}
              >
                <Text>{course.title}</Text>
              </RouterLink>
            </div>
            <div>
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
          </div>
        }
        description={
          <div>
            <Tag>C#</Tag>
            <Tag>React</Tag>
          </div>
        }
      />
      We supply a series of design principles, practical patterns and high
      quality design resources (Sketch and Axure), to help people create their
      product prototypes beautifully and efficiently.
    </List.Item>
  );
}

function CreatedTutorials({ courses }) {
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
      renderItem={(course) => <CreatedTutorial course={course} />}
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
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
            <span>Your Courses</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      <PaddedContent>
        <FloatingActionButton>
          <Tooltip title="Add Tutorial" placement="bottom">
            <RouterLink to="/admin/create-tutorial">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                css={{ width: 40, height: 40 }}
              />
            </RouterLink>
          </Tooltip>
        </FloatingActionButton>

        {/* List */}
        {courses ? <CreatedTutorials courses={courses} /> : <PageSpinner />}
      </PaddedContent>
    </AppLayout>
  );
}
