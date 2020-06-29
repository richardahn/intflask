/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { PageHeader, message, Layout, Typography } from 'antd';
import CourseEditor from '../components/EditCourse/CourseEditor';
import { parseCourseContent } from '../utils/course';

// -- Redux --
import { connect } from 'react-redux';
import { setCourse, reset } from '../actions/editCourse';

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
function EditCourse({ match, history, setCourse, reset }) {
  const { slug } = match.params;
  const onBack = useCallback(() => history.goBack(), [history]);
  const [noCourse, setNoCourse] = useState(false);

  useEffect(() => {
    axios.get(`/api/courses/${slug}`).then(
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

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title="How To Build a MERN Stack Website"
        subTitle="Editing"
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

const mapDispatchToProps = {
  setCourse,
  reset,
};

export default connect(null, mapDispatchToProps)(EditCourse);
