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
import { getPage } from '../../selectors/editTutorial';

// -- Css --
import {
  paddedContentCss,
  pageHeaderHeight,
  statusBarHeight,
  PaddedContent,
  AppLayout,
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

function isMain(page) {
  return !('name' in page);
}
function getName(page) {
  return isMain(page) ? 'Main' : page.name;
}

function CourseEditor({
  currentTopicIndex,
  currentPageIndex,
  course,
  page,
  setContent,
  saveCourse,
  setName,
  top,
}) {
  const debouncedSaveCourse = useCallback(debounce(saveCourse), []);
  const onChange = useCallback(
    (value) => {
      setContent(value, currentTopicIndex, currentPageIndex); // Update redux store every key press
      debouncedSaveCourse(); // This function saves the redux store to the database with debounce
    },
    [currentTopicIndex, currentPageIndex],
  );
  return (
    <AppLayout>
      <CourseEditorStatusBar />
      <CourseEditorSidebar />
      <PaddedContent
        css={{
          marginTop: `${top}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {page != null && page.content != null ? (
          <React.Fragment>
            <Row>
              <EditableTitle
                level={4}
                editable={
                  isMain(page)
                    ? null
                    : {
                        onChange: (name) => {
                          if (page != null && page.name !== name) {
                            setName(name);
                            saveCourse();
                          }
                        },
                      }
                }
              >
                {getName(page)}
              </EditableTitle>
            </Row>
            <Row css={{ flex: '1 1 auto' }}>
              <IntflaskEditor
                value={page.content}
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
      </PaddedContent>
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  currentTopicIndex: state.editCourse.currentTopicIndex,
  currentPageIndex: state.editCourse.currentPageIndex,
  course: state.editCourse.course,
  page: getPage(state),
});
const mapDispatchToProps = { setContent, saveCourse, setName };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor);
