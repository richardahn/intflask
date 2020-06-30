/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Layout, Spin, Row, Typography } from 'antd';
import CourseEditorSidebar from './CourseEditorSidebar';
import CourseEditorStatusBar from './CourseEditorStatusBar';

// -- Redux --
import { connect } from 'react-redux';
import { setContent, saveCourse, setName } from '../../actions/editCourse';

// -- Css --
import {
  paddedContentCss,
  pageHeaderHeight,
  statusBarHeight,
} from '../../styles';
import IntflaskEditor from '../IntflaskEditor';
import debounce from '../../utils/debounce';
const { Content } = Layout;
const { Title, Text } = Typography;

function EditableTitle({ children, ...props }) {
  return (
    <div css={{ marginTop: '0.3rem' }}>
      <Title
        {...props}
        css={css`
          textarea {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 600;
            font-size: 20px;
            line-height: 1.4;
          }
        `}
      >
        {children}
      </Title>
    </div>
  );
}

function CourseEditor({
  currentTopicIndex,
  currentPageIndex,
  course,
  setContent,
  saveCourse,
  setName,
}) {
  const changeName = useCallback((name) => {
    setName(name);
    saveCourse();
  }, []);
  let editorValue = null;
  let courseName = null;
  if (course != null) {
    if (currentPageIndex != null) {
      editorValue =
        course.data.children[currentTopicIndex].children[currentPageIndex]
          .content;
      courseName = (
        <EditableTitle level={4} editable={{ onChange: changeName }}>
          {
            course.data.children[currentTopicIndex].children[currentPageIndex]
              .name
          }
        </EditableTitle>
      );
    } else if (currentTopicIndex != null) {
      editorValue = course.data.children[currentTopicIndex].content;
      courseName = (
        <EditableTitle
          level={4}
          editable={{ onChange: changeName }}
          css={css`
            textarea {
              color: rgba(0, 0, 0, 0.85);
              font-weight: 600;
              font-size: 20px;
              line-height: 1.4;
            }
          `}
        >
          {course.data.children[currentTopicIndex].name}
        </EditableTitle>
      );
    } else {
      editorValue = course.data.main.content;
      courseName = <Title level={4}>Main</Title>;
    }
  }
  const debouncedSaveCourse = useCallback(debounce(saveCourse), []);
  const onChange = useCallback(
    (value) => {
      setContent(value, currentTopicIndex, currentPageIndex); // Update redux store every key press
      debouncedSaveCourse(); // This function saves the redux store to the database with debounce
    },
    [currentTopicIndex, currentPageIndex],
  );
  return (
    <Layout>
      <CourseEditorStatusBar />
      <CourseEditorSidebar />
      <Content
        css={[
          {
            marginTop: `${pageHeaderHeight + statusBarHeight}px`,
          },
          paddedContentCss,
        ]}
      >
        {editorValue != null ? (
          <React.Fragment>
            <Row>{courseName}</Row>
            <Row>
              <IntflaskEditor
                value={editorValue}
                onChange={onChange}
                css={{ flex: 1 }}
              />
            </Row>
          </React.Fragment>
        ) : (
          <div
            css={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  currentTopicIndex: state.editCourse.currentTopicIndex,
  currentPageIndex: state.editCourse.currentPageIndex,
  course: state.editCourse.course,
});
const mapDispatchToProps = { setContent, saveCourse, setName };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor);
