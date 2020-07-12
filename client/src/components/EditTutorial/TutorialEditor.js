/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Layout, Spin, Row, Typography, Button } from 'antd';
import TutorialEditorSidebar from './TutorialEditorSidebar';
import TutorialEditorStatusBar from './TutorialEditorStatusBar';

// -- Redux --
import { connect } from 'react-redux';

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

export default function TutorialEditor({ tutorial, top, onTutorialChange }) {
  const [currentSelectionPath, setCurrentSelectionPath] = useState([]);

  let currentPage = null;
  if (currentSelectionPath.length === 0) {
    currentPage = tutorial.content.main;
  } else if (currentSelectionPath.length === 1) {
    currentPage = tutorial.content.children[currentSelectionPath[0]];
  } else if (currentSelectionPath.length === 2) {
    currentPage =
      tutorial.content.children[currentSelectionPath[0]].children[
        currentSelectionPath[1]
      ];
  }
  console.log('current page', currentPage);
  const onContentChange = (value) => {
    onTutorialChange((tutorial) => {
      if (currentSelectionPath.length === 0) {
        return {
          ...tutorial,
          content: {
            ...tutorial.content,
            main: {
              ...tutorial.content.main,
              content: value,
            },
          },
        };
      } else if (currentSelectionPath.length === 1) {
        return {
          ...tutorial,
          content: {
            ...tutorial.content,
            children: tutorial.content.children.map((page, i) =>
              i === currentSelectionPath[0]
                ? {
                    ...page,
                    content: value,
                  }
                : page,
            ),
          },
        };
      } else if (currentSelectionPath.length === 2) {
        return {
          ...tutorial,
          content: {
            ...tutorial.content,
            children: tutorial.content.children.map((page, i) =>
              i === currentSelectionPath[0]
                ? {
                    ...page,
                    children: page.children.map((subpage, j) =>
                      j === currentSelectionPath[1]
                        ? {
                            ...subpage,
                            content: value,
                          }
                        : subpage,
                    ),
                  }
                : page,
            ),
          },
        };
      }
    });
  };
  return (
    <AppLayout>
      {tutorial && (
        <React.Fragment>
          {/* <TutorialEditorStatusBar /> */}
          <TutorialEditorSidebar
            tutorial={tutorial}
            currentSelectionPath={currentSelectionPath}
            onTutorialChange={onTutorialChange}
            onCurrentSelectionChange={setCurrentSelectionPath}
            currentPage={currentPage}
          />
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
                          if (
                            currentPage != null &&
                            currentPage.name !== name
                          ) {
                            // setName(name);
                            // debouncedSaveTutorial();
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
                value={currentPage.content}
                onChange={(value) => onContentChange(value)}
                css={{ flex: 1 }}
              />
            </Row>
          </PaddedContent>
        </React.Fragment>
      )}
    </AppLayout>
  );
}
