/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Layout,
  Col,
  Row,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  notification,
  PageHeader,
  InputNumber,
} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Content, Header } = Layout;
const { Title, Text } = Typography;

// TODO: Course in database has bool that indicates whether course is available for public
export default function EditCourse({ match }) {
  const { courseId, pageId } = match.params;
  return (
    <Layout>
      <Header css={{ backgroundColor: 'white' }}>Header</Header>
      <Content css={{ backgroundColor: 'white', padding: '0 3rem' }}>
        Content
      </Content>
    </Layout>
  );
}
