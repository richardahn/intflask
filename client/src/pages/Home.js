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
  Alert,
  Spin,
} from 'antd';
import { Link as RouterLink, Link } from 'react-router-dom';
import { GoogleOutlined, StarOutlined } from '@ant-design/icons';
import { PaddedContent, AppLayout } from '../styles';
import axios from 'axios';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { useGetEffect, usePostCallback } from '../hooks/axios';
const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

export default function Home() {
  const [, verified] = useGetEffect('/api/users/is-verified', {}, []);
  const [resendVerificationEmail, resendingVerificationEmail] = usePostCallback(
    '/api/users/resend',
    {
      onSuccess: () => message.success('Successfully sent verification email'),
      onError: () => message.error('Failed to resend verification email'),
    },
  );

  const [loadingTopTutorials, topTutorials] = useGetEffect(
    '/api/tutorials',
    {
      params: { top: true },
      onError: () => message.error('Failed to retrieve top tutorials'),
    },
    [],
  );
  const [loadingFreeTutorials, freeTutorials] = useGetEffect(
    '/api/tutorials',
    {
      params: { free: true },
      onError: () => message.error('Failed to load free tutorials'),
    },
    [],
  );
  return (
    <AppLayout>
      <PaddedContent>
        {verified !== null && !verified && (
          <Alert
            message="Unauthorized"
            description={
              <div>
                You must verify your account to start creating tutorials. Click{' '}
                {resendingVerificationEmail && <Spin />}{' '}
                <Link onClick={resendVerificationEmail}>here</Link> to resend a
                verification email.
              </div>
            }
            type="warning"
            showIcon
            css={{ marginBottom: '1rem' }}
          />
        )}
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
                <Skeleton active />
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
                <Skeleton active />
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
