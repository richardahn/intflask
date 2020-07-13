/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, { useState, useCallback } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  message,
  Skeleton,
  Empty,
} from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { AppLayout, PaddedContent } from '../styles';
import TutorialList, {
  PurchasedTutorialListItem,
} from '../components/TutorialList';
import { useApiGet } from '../hooks/useApi';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Purchases(props) {
  const [loadingPurchases, purchases] = useApiGet('/api/purchased-tutorials', {
    onError: () => message.error('Failed to load purchased tutorials'),
  });
  return (
    <AppLayout>
      <PaddedContent>
        {loadingPurchases ? (
          <Skeleton />
        ) : purchases ? (
          purchases.length > 0 ? (
            <React.Fragment>
              <Divider orientation="left">Purchased Tutorials</Divider>
              <TutorialList
                tutorials={purchases}
                itemRenderer={PurchasedTutorialListItem}
              />
            </React.Fragment>
          ) : (
            <Empty description="No purchased tutorials" />
          )
        ) : (
          <Empty description="Could not fetch purchased tutorials" />
        )}
      </PaddedContent>
    </AppLayout>
  );
}
