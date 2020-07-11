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
} from 'antd';
import { PaddedContent, AppLayout, AppHeader } from '../styles';
import { Link as RouterLink } from 'react-router-dom';
import TutorialDetails from '../components/EditCourse/TutorialDetails';
import CourseEditor from '../components/EditCourse/CourseEditor';
import InputTags from '../components/InputTags';
import { parseCourseContent } from '../utils/course';
import { HomeOutlined } from '@ant-design/icons';
import TutorialDescriptionForm from '../components/TutorialDescriptionForm';

// -- Redux --
import { connect } from 'react-redux';
import { setCourse, reset } from '../actions/editCourse';
import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';

const { Content, Header } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

// -- Helpers --
function TutorialDashboard({ course, match, setCourse, reset }) {
  const { slug } = match.params;
  const [loadingPage, setLoadingPage] = useState(true);
  const [savingForm, setSavingForm] = useState(false);

  const submitTutorialDescription = useCallback((formValues) => {
    setSavingForm(true);
    axios
      .put(`/api/admin/courses/${slug}`, formValues)
      .then(() => message.success('Successfully saved'))
      .catch((error) => {
        console.error(error);
        message.error('Failed to save description');
      })
      .finally(() => setSavingForm(false));
  }, []);

  const initialDescriptionFormState = {
    name: course?.courseName,
    price: 5,
    description: 'Default text',
    technologyStack: ['C#', 'React'],
  };

  useEffect(() => {
    axios
      .get(`/api/admin/courses/${slug}`)
      .then((response) => setCourse(parseCourseContent(response.data)))
      .catch((error) => {
        console.error(error);
        message.error('Failed to get course');
      })
      .finally(() => setLoadingPage(false));

    return function cleanup() {
      reset();
    };
  }, [slug]);
  return (
    <AppLayout>
      <AppHeader css={{ height: 'initial' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <RouterLink to="/admin">
              <HomeOutlined /> Administrator
            </RouterLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </AppHeader>
      {loadingPage ? (
        <PageSpinner />
      ) : course ? (
        <PaddedContent>
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={
              <RouterLink to={`/admin/edit-course/${slug}`}>
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
            <TabPane tab="Description" key="2">
              <Card>
                <TutorialDescriptionForm
                  initialState={initialDescriptionFormState}
                  onSubmit={submitTutorialDescription}
                  saving={savingForm}
                />
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

const mapStateToProps = (state) => ({
  course: state.editCourse.course,
});
const mapDispatchToProps = {
  setCourse,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialDashboard);
