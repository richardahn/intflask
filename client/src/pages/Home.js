/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

function Courses() {
  return (
    <div>
      <Row>
        <Col xs={24} lg={12}>
          Col
        </Col>
        <Col xs={24} lg={12}>
          Col
        </Col>
      </Row>
    </div>
  );
}

export default function Home(props) {
  return (
    <Layout>
      <Header css={{ backgroundColor: 'white', height: 'initial' }}>
        <Title level={4} css={{ margin: '0 !important' }}>
          Your Courses
        </Title>
      </Header>
      <Content css={{ backgroundColor: 'white', padding: '0 3rem' }}>
        Your Courses
      </Content>
      <Header
        css={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          height: 'initial',
        }}
      >
        <Title level={4} css={{ margin: '0 !important' }}>
          Top Courses
        </Title>
        <RouterLink
          to="/all-courses"
          css={{ marginLeft: '0.4rem', fontSize: '10px', lineHeight: 0 }}
        >
          <Text type="secondary">View All</Text>
        </RouterLink>
      </Header>
      <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
        <Courses />
      </Content>
    </Layout>
  );
}
