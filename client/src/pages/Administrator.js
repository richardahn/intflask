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

const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

export default function Administrator() {
  const [loadingTutorials, setLoadingTutorials] = useState(true);
  const [tutorials, setTutorials] = useState(null);
  useEffect(() => {
    axios
      .get('/api/admin/tutorials')
      .then((response) => setTutorials(response.data))
      .catch((error) => {
        console.error(error);
        message.error('Failed to load tutorials');
      })
      .finally(() => setLoadingTutorials(false));
  }, []);

  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
            <span>Created Tutorials</span>
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
        <Divider orientation="left">Created Tutorials</Divider>
        {loadingTutorials ? (
          <Skeleton />
        ) : tutorials && tutorials.length > 0 ? (
          <TutorialList
            tutorials={tutorials}
            itemRenderer={AdminTutorialListItem}
          />
        ) : (
          <Empty description="No Tutorials" />
        )}
      </PaddedContent>
    </AppLayout>
  );
}
