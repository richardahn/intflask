/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Button, Typography, Space, List, Avatar, Tag } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

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

export default function Administrator() {
  const courses = [];
  for (let i = 0; i < 4; i++) {
    courses.push({
      title: `Course ${i}`,
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }
  return (
    <Layout>
      <Header css={{ backgroundColor: 'white' }}>
        <Title level={3}>Administrator Dashboard</Title>
      </Header>
      <Content css={{ backgroundColor: 'white', padding: '0 3rem' }}>
        <Space align="center">
          <Title level={4} css={{ marginBottom: '0 !important' }}>
            Your Created Courses
          </Title>
          <RouterLink to="/admin/create-course">
            <Button type="primary">Create a Course</Button>
          </RouterLink>
        </Space>

        {/* List */}
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
          renderItem={(item) => (
            <List.Item
              key={item.title}
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
                avatar={<Avatar src={item.avatar} />}
                title={
                  <div
                    css={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <a css={{ marginRight: '1rem' }}>
                        <Text>{item.title}</Text>
                      </a>
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        deployed
                      </Tag>
                    </div>
                    <Space>
                      <Button>View</Button>
                      <Button>Edit</Button>
                    </Space>
                  </div>
                }
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
