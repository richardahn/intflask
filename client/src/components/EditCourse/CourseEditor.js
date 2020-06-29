/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Layout, Spin } from 'antd';
import CourseEditorSidebar from './CourseEditorSidebar';
import CourseEditorStatusBar from './CourseEditorStatusBar';

// -- Redux --
import { connect } from 'react-redux';
import { setContent, saveCourse } from '../../actions/editCourse';

// -- Css --
import {
  paddedContentCss,
  pageHeaderHeight,
  statusBarHeight,
} from '../../styles';
import IntflaskEditor from '../IntflaskEditor';
import debounce from '../../utils/debounce';
const { Content } = Layout;

function CourseEditor({
  currentTopicIndex,
  currentPageIndex,
  course,
  setContent,
  saveCourse,
}) {
  let editorValue = null;
  if (course != null) {
    if (currentPageIndex != null) {
      editorValue =
        course.data.children[currentTopicIndex].children[currentPageIndex]
          .content;
    } else if (currentTopicIndex != null) {
      editorValue = course.data.children[currentTopicIndex].content;
    } else {
      editorValue = course.data.main.content;
    }
  }
  const debouncedSaveCourse = useCallback(debounce(saveCourse), []);
  const onChange = useCallback(
    (value) => {
      setContent(value, currentTopicIndex, currentPageIndex); // Update redux store every key press
      debouncedSaveCourse(course); // This function saves the redux store to the database with debounce
    },
    [currentTopicIndex, currentPageIndex, course],
  );
  return (
    <Layout>
      <CourseEditorStatusBar />
      <CourseEditorSidebar />
      <Content
        css={[
          {
            marginTop: `${pageHeaderHeight + statusBarHeight}px`,
            display: 'flex',
          },
          paddedContentCss,
        ]}
      >
        {editorValue != null ? (
          <IntflaskEditor
            value={editorValue}
            onChange={onChange}
            css={{ flex: 1 }}
          />
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
const mapDispatchToProps = { setContent, saveCourse };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor);
