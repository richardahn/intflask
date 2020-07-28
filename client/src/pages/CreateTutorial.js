/** @jsx jsx */
import { HomeOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import { Breadcrumb, Card, message } from 'antd';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';
import { AppHeader, AppLayout, PaddedContent } from '../styles';

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
