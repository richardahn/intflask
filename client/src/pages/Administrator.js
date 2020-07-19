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
  Tag,
  Breadcrumb,
  Tooltip,
  message,
  Empty,
  Skeleton,
  Divider,
  Alert,
} from 'antd';
import PageSpinner from '../components/PageSpinner';
import {
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
import TutorialList, {
  AdminTutorialListItem,
} from '../components/TutorialList';
import { useGetEffect } from '../hooks/axios';

const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

export default function Administrator() {
  const [notVerified, setNotVerified] = useState(null);
  const [loadingTutorials, tutorials] = useGetEffect(
    '/api/admin/tutorials',
    {
      onError: (error) => {
        if (error.response.data.notVerified) {
          setNotVerified(true);
        } else {
          message.error('Failed to load tutorials');
        }
      },
    },
    [],
  );

  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined /> Admin Home
          </Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      {notVerified ? (
        <PaddedContent css={{ marginTop: '1rem' }}>
          <Alert
            message="Unauthorized"
            description="You must verify your account to start creating tutorials"
            type="warning"
            showIcon
            css={{ marginBottom: '1rem' }}
          />
          <RouterLink to="/">
            <Button type="primary" size="large">
              Go Back Home
            </Button>
          </RouterLink>
        </PaddedContent>
      ) : (
        <PaddedContent>
          <FloatingActionButton>
            <Tooltip title="Add Tutorial" placement="left">
              <RouterLink to="/admin/create-tutorial">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  css={{
                    width: 40,
                    height: 40,
                    boxShadow:
                      '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)',
                  }}
                />
              </RouterLink>
            </Tooltip>
          </FloatingActionButton>
          <Divider orientation="left">Created Tutorials</Divider>
          {loadingTutorials ? (
            <Skeleton active />
          ) : tutorials && tutorials.length > 0 ? (
            <TutorialList
              tutorials={tutorials}
              itemRenderer={AdminTutorialListItem}
            />
          ) : (
            <Empty description="No Tutorials" />
          )}
        </PaddedContent>
      )}
    </AppLayout>
  );
}
