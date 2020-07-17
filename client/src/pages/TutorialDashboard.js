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
  Divider,
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

import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

const { Content, Header } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

function StatisticsTab() {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Divider orientation="left">Purchase History</Divider>
        <Chart
          padding={[10, 20, 50, 40]}
          autoFit
          height={500}
          data={data}
          scale={{ value: { min: 0 } }}
        >
          <Line position="year*value" />
          <Point position="year*value" />
        </Chart>
      </Col>
      <Col sm={8} xs={24}>
        <Statistic title="Total Purchases" value={120} />
      </Col>
      <Col sm={8} xs={24}>
        <Statistic
          title="Average Purchases Per Month"
          value={5}
          precision={1}
        />
      </Col>
      <Col sm={8} xs={24}>
        <Statistic
          title="Total Money Earned"
          prefix="$"
          value={53.4}
          precision={2}
        />
      </Col>

      <Col lg={8} xs={24}>
        <Divider orientation="left">User Statistics</Divider>
        <Statistic title="Average stay time" value={3} />
      </Col>
    </Row>
  );
}

export default function TutorialDashboard({ match, history }) {
  const { slug } = match.params;
  const [loadingPage, setLoadingPage] = useState(true);
  const [savingForm, setSavingForm] = useState(false);
  const [savingDeploy, setSavingDeploy] = useState(false);
  const [tutorial, setTutorial] = useState(null);

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
              <StatisticsTab />
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
