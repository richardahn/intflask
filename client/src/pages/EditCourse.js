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
} from 'antd';
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
} from '../styles';

const { Content } = Layout;
const { Title } = Typography;

// -- Helpers --
function EditCourse({
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
  const [noCourse, setNoCourse] = useState(false);
  const [deployButtonLoading, setDeployButtonLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/admin/courses/${slug}`).then(
      (response) => {
        setCourse(parseCourseContent(response.data));
      },
      (error) => {
        console.error(error);
        message.error('Failed to get course');
        setNoCourse(true);
      },
    );

    return function cleanup() {
      reset();
    };
  }, [slug]);

  const deployButtonOnClick = (deploy) => {
    setDeployed(deploy);
    setDeployButtonLoading(true);
    saveCourse(
      () => setDeployButtonLoading(false),
      () => setDeployButtonLoading(false),
    );
  };

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title={
          <div css={{ marginTop: '0.3rem' }}>
            <Title
              level={4}
              editable={{
                onChange: (name) => {
                  if (name !== courseName) {
                    setCourseName(name);
                    saveCourse();
                  }
                },
              }}
              css={css`
                position: initial;
                textarea {
                  color: rgba(0, 0, 0, 0.85);
                  font-weight: 600;
                  font-size: 20px;
                  line-height: 1.4;
                  position: relative;
                  width: 80vw;
                  max-height: 2.5rem !important;
                  z-index: 99;
                }
              `}
            >
              {courseName}
            </Title>
          </div>
        }
        subTitle="Editing"
        extra={[
          courseDeployed ? (
            <Button
              size="small"
              danger
              icon={<EyeInvisibleOutlined />}
              css={{ fontSize: '0.7rem' }}
              key="hideButton"
              loading={deployButtonLoading}
              onClick={() => deployButtonOnClick(false)}
            >
              Hide Course
            </Button>
          ) : (
            <Button
              size="small"
              icon={<EyeOutlined />}
              css={{ fontSize: '0.7rem' }}
              key="deployButton"
              loading={deployButtonLoading}
              onClick={() => deployButtonOnClick(true)}
            >
              Deploy Course
            </Button>
          ),
        ]}
      />
      {noCourse ? (
        <Content
          css={[
            {
              marginTop: `${pageHeaderHeight}px`,
              display: 'flex',
              justifyContent: 'center',
            },
            paddedContentCss,
          ]}
        >
          <Title level={4}>You are not authorized to edit this course</Title>
        </Content>
      ) : (
        <CourseEditor />
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
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
