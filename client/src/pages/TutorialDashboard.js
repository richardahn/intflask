/** @jsx jsx */
// -- General Imports --
import {
  CheckCircleOutlined,
  HomeOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { jsx } from '@emotion/core';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  message,
  Row,
  Statistic,
  Tabs,
  Tag,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { Chart, Line, Point } from 'bizcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ErrorContent from '../components/ErrorContent';
import PageSpinner from '../components/PageSpinner';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';
import { useDeleteCallback } from '../hooks/axios';
import { AppHeader, AppLayout, PaddedContent } from '../styles';
import { parseTutorialDates } from '../utils/tutorial';

const { TabPane } = Tabs;

function binPurchases(purchases) {
  const histogram = {};
  for (const purchase of purchases) {
    const day = purchase.date.toLocaleDateString('en-US');
    if (!(day in histogram)) {
      histogram[day] = 0;
    }
    histogram[day]++;
  }
  const histogramArray = Object.entries(histogram).map(([key, value]) => ({
    date: key,
    purchases: value,
  }));
  histogramArray.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  if (histogramArray.length > 0) {
    // Add 0 just before the first date
    const zeroDate = new Date(histogramArray[0].date);
    zeroDate.setDate(zeroDate.getDate() - 1);
    histogramArray.unshift({
      date: zeroDate.toLocaleDateString('en-US'),
      purchases: 0,
    });

    // Add today as the last date
    const lastDate = new Date(histogramArray[histogramArray.length - 1].date);
    const today = new Date();
    const lastDateIsToday =
      lastDate.getDate() == today.getDate() &&
      lastDate.getMonth() == today.getMonth() &&
      lastDate.getFullYear() == today.getFullYear();
    if (!lastDateIsToday) {
      histogramArray.push({
        date: today.toLocaleDateString('en-US'),
        purchases: 0,
      });
    }
  }
  return histogramArray;
}

function StatisticsTab({ tutorial }) {
  const purchases = binPurchases(tutorial.purchases);
  const totalPurchases = tutorial.purchases.length;
  const totalRevenue = tutorial.purchases.reduce(
    (total, { price }) => total + price,
    0,
  );
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Divider orientation="left">Purchase History</Divider>
        <Chart
          padding={[10, 40, 50, 40]}
          autoFit
          height={400}
          data={purchases}
          scale={{
            purchases: { min: 0 },
            date: { type: 'time' },
          }}
        >
          <Line position="date*purchases" shape="hv" />
          <Point position="date*purchases" />
        </Chart>
      </Col>
      <Col sm={12} xs={24}>
        <Statistic title="Total Purchases" value={totalPurchases} />
      </Col>
      <Col sm={12} xs={24}>
        <Statistic
          title="Total Revenue"
          prefix="$"
          value={totalRevenue}
          precision={2}
        />
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
      .then((response) => setTutorial(parseTutorialDates(response.data)))
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

  const [deleteTutorialModalVisible, setDeleteTutorialModalVisible] = useState(
    false,
  );
  const [deleteTutorial, loadingDeleteTutorial] = useDeleteCallback(
    `/api/admin/tutorials/${slug}`,
    {
      onSuccess: () => {
        setDeleteTutorialModalVisible(false);
        message.success('Successfully deleted tutorial');
        history.push('/admin');
      },
      onError: () => message.error('Failed to delete tutorial'),
    },
    [],
  );
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb css={{ marginBottom: '1rem' }}>
          <Breadcrumb.Item>
            <RouterLink to="/admin">
              <HomeOutlined /> Admin Home
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
              <StatisticsTab tutorial={tutorial} />
            </TabPane>
            <TabPane tab="Settings" key="2">
              <Row gutter={[0, 12]}>
                <Col span={24}>
                  <Card title="General" css={{ flex: 1 }}>
                    <TutorialDescriptionForm
                      initialState={initialDescriptionFormState}
                      onSubmit={submitTutorialDescription}
                      saving={savingForm}
                    />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Deployment" css={{ flex: 1 }}>
                    <div
                      css={{ display: 'flex', justifyContent: 'space-between' }}
                    >
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
                </Col>
                <Col span={24}>
                  <Card title="Delete" css={{ flex: 1 }}>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setDeleteTutorialModalVisible(true)}
                    >
                      Delete Tutorial
                    </Button>
                    <Modal
                      title="Delete Tutorial"
                      visible={deleteTutorialModalVisible}
                      onOk={deleteTutorial}
                      onCancel={() => setDeleteTutorialModalVisible(false)}
                      okButtonProps={{
                        danger: true,
                      }}
                      confirmLoading={loadingDeleteTutorial}
                    >
                      Are you sure you want to delete this tutorial? This action
                      cannot be undone.
                    </Modal>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </PaddedContent>
      ) : (
        <ErrorContent>Could not load page</ErrorContent>
      )}
    </AppLayout>
  );
}
