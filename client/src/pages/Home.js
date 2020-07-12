/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import { Layout, Menu, Typography, Row, Col, Space, Tabs, Button } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

function Guides() {
  return <Content>guides</Content>;
}
function Tutorials() {
  return (
    <Layout css={{ backgroundColor: 'white' }}>
      <Content
        css={{
          maxHeight: 'fit-content',
          backgroundColor: 'white',
          marginBottom: '3rem',
        }}
      >
        <div>
          <Space css={{ display: 'flex', alignItems: 'center' }}>
            <Title level={4} css={{ marginBottom: '0 !important' }}>
              Purchased
            </Title>
            <Button>View All Purchased</Button>
          </Space>
        </div>
        You purchased these
      </Content>
      <Content css={{ backgroundColor: 'white' }}>
        <div>
          <Space css={{ display: 'flex', alignItems: 'center' }}>
            <Title level={4} css={{ marginBottom: '0 !important' }}>
              Top Tutorials
            </Title>
            <Button>View All Tutorials</Button>
          </Space>
        </div>
        Top tutorials
      </Content>
    </Layout>
  );
}

export default function Home(props) {
  return (
    <Content
      css={{
        padding: '0 3rem',
        backgroundColor: 'white',
        display: 'flex',
      }}
    >
      <Tabs
        defaultActiveKey="1"
        css={css`
          flex: 1;
          .ant-tabs-content-holder {
            display: flex;
          }
          .ant-tabs-tabpane {
            display: flex;
          }
        `}
      >
        <TabPane tab="Guides" key="1">
          <Guides />
        </TabPane>
        <TabPane tab="Tutorials" key="2">
          <Tutorials />
        </TabPane>
      </Tabs>
    </Content>
  );
}
