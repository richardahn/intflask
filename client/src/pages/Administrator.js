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

function convertFormat(tutorials) {
  return tutorials.map((tutorial) => ({
    name: tutorial.name,
    slug: tutorial.slug,
    editUrl: `/admin/edit-tutorial/${tutorial.slug}`,
    deployed: tutorial.deployed,
  }));
}

export default function Administrator() {
  const [tutorials, setTutorials] = useState(null);
  useEffect(() => {
    axios
      .get('/api/admin/tutorials')
      .then((response) => response.data)
      .then(convertFormat)
      .then((tutorials) => setTutorials(tutorials));
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

        {/* List */}
        {tutorials ? (
          <TutorialList
            tutorials={tutorials}
            itemRenderer={AdminTutorialListItem}
          />
        ) : (
          <PageSpinner />
        )}
      </PaddedContent>
    </AppLayout>
  );
}
