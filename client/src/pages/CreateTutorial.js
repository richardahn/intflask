/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
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
  message,
  PageHeader,
  InputNumber,
  Breadcrumb,
} from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { AppHeader, PaddedContent, AppLayout } from '../styles';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';

const { Content, Header } = Layout;
const { Title, Text } = Typography;

export default function CreateTutorial({ history }) {
  const goBack = useCallback(() => history.push('/admin'), [history]);
  const [savingForm, setSavingForm] = useState(false);
  const onFinish = useCallback((values) => {
    setSavingForm(true);
    console.log(values);
    axios
      .post('/api/admin/courses', values)
      .then((response) => {
        message.success('Successfully created course');
        history.push(`/admin/edit-course/${response.data.slug}`);
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to create the course');
      })
      .finally(() => setSavingForm(false));
  }, []);
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial', marginBottom: '1rem' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined />
            <span>Your Courses</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      <PaddedContent>
        <Card>
          <TutorialDescriptionForm onSubmit={onFinish} saving={savingForm} />
        </Card>
      </PaddedContent>
    </AppLayout>
  );
}
