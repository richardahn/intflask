/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Card, message, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { AppHeader, PaddedContent, AppLayout } from '../styles';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';

export default function CreateTutorial({ history }) {
  const [savingForm, setSavingForm] = useState(false);
  const onFinish = useCallback((values) => {
    setSavingForm(true);
    console.log(values);
    axios
      .post('/api/admin/tutorials', values)
      .then((response) => {
        message.success('Successfully created tutorial');
        history.push(`/admin/tutorial-dashboard/${response.data.slug}`);
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to create the tutorial');
      })
      .finally(() => setSavingForm(false));
  }, []);
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial', marginBottom: '1rem' }}>
        <Breadcrumb css={{ marginBottom: '1rem' }}>
          <Breadcrumb.Item>
            <RouterLink to="/admin">
              <HomeOutlined /> Admin Home
            </RouterLink>
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
