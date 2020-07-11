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
  Space,
  Breadcrumb,
} from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import TutorialDetails from '../components/EditCourse/TutorialDetails';
import CourseEditor from '../components/EditCourse/CourseEditor';
import { parseCourseContent } from '../utils/course';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  SettingOutlined,
  CloseOutlined,
  HomeOutlined,
} from '@ant-design/icons';

// -- Redux --
import { connect } from 'react-redux';
import {
  setCourse,
  reset,
  setDeployed,
  saveCourse,
  setCourseName,
} from '../actions/editCourse';

// -- Css --
import {
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  paddedContentCss,
  AppLayout,
  AppHeader,
  AppFixedHeader,
} from '../styles';
import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';

const { Content } = Layout;
const { Title } = Typography;

// -- Helpers --
function EditCourse({
  course,
  courseName,
  courseDeployed,
  match,
  history,
  setCourse,
  reset,
  setDeployed,
  saveCourse,
  setCourseName,
}) {
  const { slug } = match.params;
  const onBack = useCallback(() => history.push('/admin'), [history]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/admin/courses/${slug}`)
      .then((response) => {
        setCourse(parseCourseContent(response.data));
      })
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
      {loadingPage ? (
        <PageSpinner />
      ) : course ? (
        <React.Fragment>
          <AppFixedHeader top={mainHeaderHeight} css={{ height: 'initial' }}>
            <Breadcrumb css={{ marginBottom: '1rem' }}>
              <Breadcrumb.Item>
                <RouterLink to="/admin">
                  <HomeOutlined /> Administrator
                </RouterLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <RouterLink to={`/tutorial-dashboard/${slug}`}>
                  Dashboard
                </RouterLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={4} css={{ marginBottom: 0 }}>
              {courseName}
            </Title>
          </AppFixedHeader>
          <CourseEditor top={pageHeaderHeight + statusBarHeight} />
        </React.Fragment>
      ) : (
        <ErrorContent>
          You are not authorized to edit this tutorial
        </ErrorContent>
      )}
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  course: state.editCourse.course,
  courseDeployed: state.editCourse.course?.deployed,
  courseName: state.editCourse.course?.courseName,
});
const mapDispatchToProps = {
  setCourse,
  reset,
  setDeployed,
  saveCourse,
  setCourseName,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
