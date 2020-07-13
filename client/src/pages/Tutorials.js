/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  List,
  Space,
  Avatar,
  message,
  Skeleton,
  Empty,
  Divider,
} from 'antd';
import {
  GoogleOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { useApiGet } from '../hooks/useApi';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Tutorials(props) {
  const [loadingTutorial, tutorials] = useApiGet('/api/tutorials', {
    onError: () => message.error('Failed to load tutorials'),
  });

  return (
    <Layout>
      <Sider theme="light" breakpoint="lg" collapsedWidth="0">
        <div css={{ padding: '1rem 2rem' }}>Hello Sidebar</div>
      </Sider>
      <Layout>
        <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
          <Divider orientation="left">All Tutorials</Divider>
          {loadingTutorial ? (
            <Skeleton />
          ) : tutorials ? (
            tutorials.length > 0 ? (
              <TutorialList
                tutorials={tutorials}
                itemRenderer={TutorialListItem}
              />
            ) : (
              <Empty description="No Tutorials" />
            )
          ) : (
            <Empty description="Could not fetch tutorials" />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
