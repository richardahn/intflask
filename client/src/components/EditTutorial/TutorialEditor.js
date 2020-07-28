/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import { Row, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppLayout,
  mainHeaderHeight,
  PaddedContent,
  pageHeaderHeight,
  statusBarHeight,
} from '../../styles';
import {
  getCurrentPageFromSelection,
  getName,
  isMain,
  reduceTutorialContent,
  reduceTutorialCurrentPageName,
} from '../../utils/tutorial';
import IntflaskEditor from '../IntflaskEditor';
import TutorialEditorSidebar from './TutorialEditorSidebar';
import TutorialEditorStatusBar from './TutorialEditorStatusBar';

const { Title } = Typography;

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
      editor.setContents([]);
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
          overflowX: 'inherit !important',
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
          <IntflaskEditor
            onChange={onContentChange}
            ref={setQuillRef}
            toolbarTop={
              mainHeaderHeight + pageHeaderHeight + statusBarHeight - 1
            }
          />
        </Row>
      </PaddedContent>
    </AppLayout>
  );
}
