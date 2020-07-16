/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  PageHeader,
  message,
  Layout,
  Typography,
  Button,
  Tag,
  Breadcrumb,
  Space,
  Card,
  Col,
  Row,
  Statistic,
  Tabs,
  Form,
  Input,
  Checkbox,
  InputNumber,
  Alert,
} from 'antd';
import { PaddedContent, AppLayout, AppHeader } from '../styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  HomeOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';

import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';

const { Content, Header } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

// -- Helpers --
export default function TutorialDashboard({ match, history }) {
  const { slug } = match.params;
  const [loadingPage, setLoadingPage] = useState(true);
  const [savingForm, setSavingForm] = useState(false);
  const [savingDeploy, setSavingDeploy] = useState(false);
  const [tutorial, setTutorial] = useState(null);
  console.log(tutorial);

  const submitTutorialDescription = useCallback(
    (formValues) => {
      setSavingForm(true);
      axios
        .put(`/api/admin/tutorials/${slug}`, formValues)
        .then((response) => {
          message.success('Successfully saved');
          history.push(`/admin/tutorial-dashboard/${response.data}`);
        })
        .catch((error) => {
          console.error(error);
          message.error('Failed to save description');
        })
        .finally(() => setSavingForm(false));
    },
    [slug],
  );

  const deployTutorial = useCallback(
    (deployed) => {
      setSavingDeploy(true);
      axios
        .put(`/api/admin/tutorials/${slug}`, { deployed })
        .then((response) => {
          message.success(
            deployed ? 'Successfully deployed' : 'Successfully hidden',
          );
          setTutorial((state) => ({ ...state, deployed }));
        })
        .catch((error) => {
          console.error(error);
          message.error('Failed to deploy');
        })
        .finally(() => setSavingDeploy(false));
    },
    [slug],
  );

  useEffect(() => {
    axios
      .get(`/api/admin/tutorials/${slug}`, {
        params: {
          content: false,
        },
      })
      .then((response) => setTutorial(response.data))
      .catch((error) => {
        console.error(error);
        message.error('Failed to get tutorial');
      })
      .finally(() => setLoadingPage(false));

    return function cleanup() {
      setTutorial(null);
      setLoadingPage(true);
      setSavingForm(false);
    };
  }, [slug]);

  const initialDescriptionFormState = {
    name: tutorial?.name,
    price: tutorial?.price,
    description: tutorial?.description,
    technologyStack: tutorial?.technologyStack,
  };
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb css={{ marginBottom: '1rem' }}>
          <Breadcrumb.Item>
            <RouterLink to="/admin">
              <HomeOutlined /> Created Tutorials
            </RouterLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      {loadingPage ? (
        <PageSpinner />
      ) : tutorial ? (
        <PaddedContent>
          {!tutorial.deployed && (
            <Alert
              message="This tutorial is not yet viewable to the public. In order to deploy, go to Settings > Deployment"
              type="warning"
              closable
            />
          )}
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={
              <RouterLink to={`/admin/edit-tutorial/${slug}`}>
                <Button>Edit Tutorial</Button>
              </RouterLink>
            }
          >
            <TabPane tab="Statistics" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="Purchases" value={3} />
                </Col>
                <Col span={8}>
                  <Statistic title="Average stay time" value={3} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Settings" key="2">
              <Card title="General" css={{ marginBottom: '1rem' }}>
                <TutorialDescriptionForm
                  initialState={initialDescriptionFormState}
                  onSubmit={submitTutorialDescription}
                  saving={savingForm}
                />
              </Card>
              <Card title="Deployment">
                <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                  {tutorial?.deployed ? (
                    <React.Fragment>
                      <span>
                        Status:{' '}
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          deployed
                        </Tag>
                      </span>
                      <Button
                        loading={savingDeploy}
                        onClick={() => deployTutorial(false)}
                      >
                        Hide
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span>
                        Status:{' '}
                        <Tag icon={<MinusCircleOutlined />} color="default">
                          hidden
                        </Tag>
                      </span>
                      <Button
                        loading={savingDeploy}
                        type="primary"
                        onClick={() => deployTutorial(true)}
                      >
                        Deploy
                      </Button>
                    </React.Fragment>
                  )}
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </PaddedContent>
      ) : (
        <ErrorContent>Could not load page</ErrorContent>
      )}
    </AppLayout>
  );
}
