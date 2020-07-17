/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Row, Typography, Button } from 'antd';
import TutorialEditorSidebar from './TutorialEditorSidebar';
import TutorialEditorStatusBar from './TutorialEditorStatusBar';
import {
  reduceTutorialContent,
  getCurrentPageFromSelection,
  isMain,
  getName,
  reduceTutorialCurrentPageName,
} from '../../utils/tutorial';

import { PaddedContent, AppLayout } from '../../styles';
import IntflaskEditor from '../IntflaskEditor';
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

export default function TutorialEditor({
  tutorial,
  top,
  onTutorialChange,
  saveState,
}) {
  const quillRef = useRef(null);
  const setQuillRef = useCallback((ref) => {
    if (ref) {
      const editor = ref.getEditor();
      editor.root.setAttribute('spellcheck', false);
      quillRef.current = ref;
    }
  }, []);
  const [currentSelectionPath, setCurrentSelectionPath] = useState([]);
  let currentPage = getCurrentPageFromSelection(tutorial, currentSelectionPath);
  const onContentChange = useCallback(
    (_, __, source, editor) => {
      if (source === 'api') {
        return;
      }
      onTutorialChange(
        reduceTutorialContent(
          tutorial,
          currentSelectionPath,
          editor.getContents(),
        ),
      );
    },
    [tutorial, currentSelectionPath, currentPage],
  );
  useEffect(() => {
    if (quillRef) {
      const editor = quillRef.current.getEditor();
      editor.setContents(currentPage.content);
      editor.history.clear();
    }
  }, [currentSelectionPath]);
  const onPageNameChange = useCallback(
    (name) =>
      onTutorialChange(
        reduceTutorialCurrentPageName(tutorial, currentSelectionPath, name),
      ),
    [tutorial, currentSelectionPath],
  );
  return (
    <AppLayout>
      <TutorialEditorStatusBar saveState={saveState} />
      <TutorialEditorSidebar
        tutorial={tutorial}
        currentSelectionPath={currentSelectionPath}
        onTutorialChange={onTutorialChange}
        onCurrentSelectionChange={setCurrentSelectionPath}
        currentPage={currentPage}
      />
      <PaddedContent
        x={1.5}
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
                        onPageNameChange(name);
                      }
                    },
                  }
            }
          >
            {getName(currentPage)}
          </EditableTitle>
        </Row>
        <Row css={{ flex: 1 }}>
          <IntflaskEditor onChange={onContentChange} ref={setQuillRef} />
        </Row>
      </PaddedContent>
    </AppLayout>
  );
}
