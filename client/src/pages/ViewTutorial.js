/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { message, Typography, Breadcrumb, Layout, Menu } from 'antd';
import { Link as RouterLink, Prompt } from 'react-router-dom';
import TutorialEditor from '../components/EditTutorial/TutorialEditor';
import { parseTutorialContent, saveTutorial } from '../utils/tutorial';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {
  HomeOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { arrayEquals } from '../utils/array';

// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  tutorialSidebarWidth,
  paddedContentCss,
  AppLayout,
  AppHeader,
  AppFixedHeader,
  PaddedContent,
} from '../styles';
import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';
import saveStates, { getNextState } from '../enums/saveStates';
import { useApiGet } from '../hooks/useApi';
import { EmptyMenuItem } from '../components/intflask-antd';

import {
  reduceTutorialContent,
  getCurrentPageFromSelection,
  isMain,
  getName,
  reduceTutorialCurrentPageName,
} from '../utils/tutorial';
// -- Css --
const { Title } = Typography;
const { Sider } = Layout;
const scrollbarCss = [
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)', // 48px comes from the fixed footer to minimize the sidebar
  },
  baseScrollbarCss,
];
function TutorialSidebar({
  tutorial,
  currentSelectionPath,
  onCurrentSelectionChange,
  currentPage,
}) {
  const [collapsedOuter, setCollapsedOuter] = useState(false);
  const onCollapseOuter = useCallback(
    (collapsed) => setCollapsedOuter(collapsed),
    [],
  );
  const [collapsedInner, setCollapsedInner] = useState(false);
  const onCollapseInner = useCallback(
    (collapsed) => setCollapsedInner(collapsed),
    [],
  );
  const showInnerSidebar =
    (currentSelectionPath.length === 1 && currentPage.children) ||
    currentSelectionPath.length === 2;
  return (
    tutorial != null &&
    currentSelectionPath != null && (
      <div
        css={{
          height: `calc(100vh - ${
            mainHeaderHeight + pageHeaderHeight + statusBarHeight
          }px)`,
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        {/* Filler Sidebar(takes up the space that the fixed sidebar would use) */}
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedOuter}
          onCollapse={onCollapseOuter}
          width={tutorialSidebarWidth}
          key="outerSidebarFiller"
        ></Sider>
        {showInnerSidebar && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedInner}
            onCollapse={onCollapseInner}
            width={tutorialSidebarWidth}
            key="innerSidebarFiller"
          ></Sider>
        )}

        {/* Fixed Sidebar Container */}
        <div
          css={{
            position: 'fixed',
            left: 0,
            top: `${mainHeaderHeight + pageHeaderHeight + statusBarHeight}px`,
            height: `calc(100vh - ${
              mainHeaderHeight + pageHeaderHeight + statusBarHeight
            }px)`,
            display: 'flex',
            flexDirection: 'row',
          }}
          key="fixedSidebarContainer"
        >
          {/* Outer Sidebar */}
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedOuter}
            onCollapse={onCollapseOuter}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedOuterSidebar"
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[
                currentSelectionPath.length === 0
                  ? '-1'
                  : String(currentSelectionPath[0]),
              ]}
            >
              <Menu.Item
                key="-1"
                css={{ fontWeight: 'bold' }}
                icon={<HomeOutlined />}
                onClick={() => {
                  if (!arrayEquals(currentSelectionPath, [])) {
                    onCurrentSelectionChange([]);
                  }
                }}
              >
                Main
              </Menu.Item>
              <Menu.Divider />
              {tutorial.content.children.length > 0 ? (
                tutorial.content.children.map((outer, i) => (
                  <Menu.Item
                    key={i}
                    css={{ fontWeight: 'bold' }}
                    onClick={() => {
                      if (!arrayEquals(currentSelectionPath, [i])) {
                        onCurrentSelectionChange([i]);
                      }
                    }}
                    icon={
                      outer.children != null ? (
                        <FolderOutlined />
                      ) : (
                        <FileOutlined />
                      )
                    }
                  >
                    {outer.name}
                  </Menu.Item>
                ))
              ) : (
                <EmptyMenuItem />
              )}
            </Menu>
          </Sider>
          {/* Inner Sidebar */}
          {showInnerSidebar && (
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedInner}
              onCollapse={onCollapseInner}
              width={tutorialSidebarWidth}
              css={scrollbarCss}
              key="fixedInnerSidebar"
            >
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={[String(currentSelectionPath[1])]}
              >
                {tutorial.content.children[currentSelectionPath[0]].children
                  .length > 0 ? (
                  tutorial.content.children[
                    currentSelectionPath[0]
                  ].children.map((inner, j) => (
                    <Menu.Item
                      key={j}
                      onClick={() => {
                        if (
                          !arrayEquals(currentSelectionPath, [
                            currentSelectionPath[0],
                            j,
                          ])
                        ) {
                          onCurrentSelectionChange([
                            currentSelectionPath[0],
                            j,
                          ]);
                        }
                      }}
                    >
                      {inner.name}
                    </Menu.Item>
                  ))
                ) : (
                  <EmptyMenuItem />
                )}
                <Menu.Divider />
              </Menu>
            </Sider>
          )}
        </div>
      </div>
    )
  );
}
function Tutorial({ tutorial, top }) {
  const [currentSelectionPath, setCurrentSelectionPath] = useState([]);
  let currentPage = getCurrentPageFromSelection(tutorial, currentSelectionPath);
  return (
    <AppLayout>
      <TutorialSidebar
        tutorial={tutorial}
        currentSelectionPath={currentSelectionPath}
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
        <ReactQuill
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            .ql-container {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .ql-editor {
              flex: 1;
            }
          `}
          theme="bubble"
          value={currentPage.content}
          readOnly
        />
      </PaddedContent>
    </AppLayout>
  );
}

export default function ViewTutorial({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useApiGet(`/api/tutorials/${slug}`, {
    params: { content: true },
    onError: () => message.error('Failed to load tutorial'),
  });
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PageSpinner />
      ) : tutorial ? (
        <PaddedContent>
          <Title level={4} css={{ marginBottom: 0 }}>
            {tutorial.name}
          </Title>
          <Tutorial
            top={pageHeaderHeight + statusBarHeight}
            tutorial={tutorial}
          />
        </PaddedContent>
      ) : (
        <ErrorContent>Failed to load tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
