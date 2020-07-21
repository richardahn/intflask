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
import { useGetEffect } from '../hooks/axios';
import CenteredContent from '../components/CenteredContent';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;

export default function Purchases(props) {
  const [loadingPurchases, purchases] = useGetEffect(
    '/api/purchased-tutorials',
    {
      onError: () => message.error('Failed to load purchased tutorials'),
    },
    [],
  );
  return (
    <AppLayout>
      {loadingPurchases ? (
        <PaddedContent>
          <Skeleton active />
        </PaddedContent>
      ) : purchases ? (
        purchases.length > 0 ? (
          <PaddedContent>
            <Divider orientation="left">Purchased Tutorials</Divider>
            <TutorialList
              tutorials={purchases}
              itemRenderer={PurchasedTutorialListItem}
            />
          </PaddedContent>
        ) : (
          <CenteredContent>
            <Empty description="No purchased tutorials" />
          </CenteredContent>
        )
      ) : (
        <CenteredContent>
          <Empty description="Could not fetch purchased tutorials" />
        </CenteredContent>
      )}
    </AppLayout>
  );
}
