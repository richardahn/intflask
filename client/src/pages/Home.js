/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Space,
  Tabs,
  Button,
  Card,
  Divider,
  message,
  Skeleton,
  Empty,
  List,
} from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined, StarOutlined } from '@ant-design/icons';
import { PaddedContent, AppLayout } from '../styles';
import axios from 'axios';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { useApiGet } from '../hooks/useApi';
const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

export default function Home() {
  const [loadingTopTutorials, topTutorials] = useApiGet(
    '/api/tutorials',
    { top: true },
    () => message.error('Failed to retrieve top tutorials'),
  );
  const [loadingFreeTutorials, freeTutorials] = useApiGet(
    '/api/tutorials',
    { free: true },
    () => message.error('Failed to load free tutorials'),
  );
  return (
    <AppLayout>
      <PaddedContent>
        <Divider orientation="left">
          <Space>
            Tutorials{' '}
            <RouterLink to="/tutorials">
              <Button size="small">View All</Button>
            </RouterLink>
          </Space>
        </Divider>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Top Tutorials">
              {loadingTopTutorials ? (
                <Skeleton />
              ) : topTutorials ? (
                topTutorials.length > 0 ? (
                  <TutorialList
                    tutorials={topTutorials}
                    itemRenderer={TutorialListItem}
                  />
                ) : (
                  <Empty description="No Top Tutorials" />
                )
              ) : (
                <Empty description="Unable to fetch top tutorials" />
              )}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Free Tutorials">
              {loadingFreeTutorials ? (
                <Skeleton />
              ) : freeTutorials ? (
                freeTutorials.length > 0 ? (
                  <TutorialList
                    tutorials={freeTutorials}
                    itemRenderer={TutorialListItem}
                  />
                ) : (
                  <Empty description="No Free Tutorials" />
                )
              ) : (
                <Empty description="Unable to fetch free tutorials" />
              )}
            </Card>
          </Col>
        </Row>
      </PaddedContent>
    </AppLayout>
  );
}
