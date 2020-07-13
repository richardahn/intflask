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
  Dropdown,
  Select,
  Checkbox,
} from 'antd';
import {
  GoogleOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { useApiGet } from '../hooks/useApi';
import Filter from '../components/Filter';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

export default function Tutorials(props) {
  const [filters, setFilters] = useState({});
  const [loadingTutorials, setLoadingTutorials] = useState(true);
  const [tutorials, setTutorials] = useState(null);

  useEffect(() => {
    setLoadingTutorials(true);
    axios
      .get('/api/tutorials', { params: filters })
      .then((response) => setTutorials(response.data))
      .catch((error) => {
        console.error(error);
        message.error('Failed to load tutorials');
      })
      .finally(() => setLoadingTutorials(false));
  }, [filters]);

  return (
    <Layout>
      <Sider theme="light" breakpoint="lg" collapsedWidth="0">
        <Filter filters={filters} onChange={setFilters} />
      </Sider>
      <Layout>
        <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
          <Divider orientation="left">All Tutorials</Divider>
          {loadingTutorials ? (
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
