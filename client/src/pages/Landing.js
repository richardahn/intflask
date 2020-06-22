/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;
const { Text } = Typography;

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

function Landing(props) {
  return (
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
        <Header css={{ backgroundColor: 'white' }}>All Courses</Header>
        <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
          <Courses />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Landing;
