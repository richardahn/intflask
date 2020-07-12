/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Layout, Spin, Row, Typography, Button } from 'antd';
import TutorialEditorSidebar from './TutorialEditorSidebar';
import TutorialEditorStatusBar from './TutorialEditorStatusBar';

// -- Redux --
import { connect } from 'react-redux';
import {
  saveTutorial,
  setName,
  setCurrentPageContent,
} from '../../actions/editTutorial';

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
import PageSpinner from '../PageSpinner';
import { getCurrentPage } from '../../selectors/editTutorial';
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

function TutorialEditor({
  currentPath,
  tutorial,
  saveTutorial,
  setName,
  setCurrentPageContent,
  top,
}) {
  const currentPage = tutorial.content.main;
  const currentContent = tutorial.content.main.content;
  const debouncedSaveTutorial = useCallback(debounce(saveTutorial), []);
  const onContentChange = useCallback((value) => {
    console.log('CHANGED');
    setCurrentPageContent(value);
    // debouncedSaveTutorial(); // This function saves the redux store to the database with debounce
  }, []);
  console.log('At TutorialEditor');
  console.log(currentContent);
  return (
    <AppLayout>
      <TutorialEditorStatusBar />
      <TutorialEditorSidebar />
      {currentPage != null ? (
        <PaddedContent
          css={{
            marginTop: `${top}px`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Row>
            <EditableTitle
              level={4}
              editable={
                isMain(currentPage)
                  ? null
                  : {
                      onChange: (name) => {
                        if (currentPage != null && currentPage.name !== name) {
                          setName(name);
                          debouncedSaveTutorial();
                        }
                      },
                    }
              }
            >
              {getName(currentPage)}
            </EditableTitle>
          </Row>
          <Row css={{ flex: '1 1 auto' }}>
            <IntflaskEditor
              value={currentContent}
              onChange={onContentChange}
              css={{ flex: 1 }}
            />
          </Row>
        </PaddedContent>
      ) : (
        <PageSpinner />
      )}
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  currentPath: state.editTutorial.currentPath,
  tutorial: state.editTutorial.tutorial,
});
const mapDispatchToProps = { saveTutorial, setName, setCurrentPageContent };

export default connect(mapStateToProps, mapDispatchToProps)(TutorialEditor);
