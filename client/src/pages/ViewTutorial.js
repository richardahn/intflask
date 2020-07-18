/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { message, Typography, Breadcrumb, Layout, Menu, Row } from 'antd';
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
import { useGetEffect } from '../hooks/axios';
import { EmptyMenuItem } from '../components/intflask-antd';

import {
  reduceTutorialContent,
  getCurrentPageFromSelection,
  isMain,
  getName,
  reduceTutorialCurrentPageName,
} from '../utils/tutorial';
import TwoLevelFixedSidebar, {
  TutorialViewerSidebarOuterContent,
  TutorialViewerSidebarInnerContent,
} from '../components/TwoLevelFixedSidebar';
import IntflaskViewer from '../components/IntflaskViewer';
// -- Css --
const { Title } = Typography;
const { Sider, Content } = Layout;
const scrollbarCss = [
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)', // 48px comes from the fixed footer to minimize the sidebar
  },
  baseScrollbarCss,
];

function TutorialViewer({ tutorial, top }) {
  const [currentSelectionPath, setCurrentSelectionPath] = useState([]);
  let currentPage = getCurrentPageFromSelection(tutorial, currentSelectionPath);
  return (
    <AppLayout>
      <TwoLevelFixedSidebar
        top={top + mainHeaderHeight}
        outerVisible={true}
        innerVisible={
          (currentSelectionPath.length === 1 && currentPage.children) ||
          currentSelectionPath.length === 2
        }
        outerContent={
          <TutorialViewerSidebarOuterContent
            tutorial={tutorial}
            currentSelectionPath={currentSelectionPath}
            onCurrentSelectionChange={setCurrentSelectionPath}
          />
        }
        innerContent={
          <TutorialViewerSidebarInnerContent
            tutorial={tutorial}
            currentSelectionPath={currentSelectionPath}
            onCurrentSelectionChange={setCurrentSelectionPath}
          />
        }
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
          <Title level={4}>{getName(currentPage)}</Title>
        </Row>
        <Row css={{ flex: 1 }}>
          <IntflaskViewer value={currentPage.content} />
        </Row>
      </PaddedContent>
    </AppLayout>
  );
}

export default function ViewTutorial({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useGetEffect(
    `/api/tutorials/${slug}`,
    {
      params: { content: true },
      transformValue: (value) => parseTutorialContent(value),
      onError: () => message.error('Failed to load tutorial'),
    },
    [],
  );
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PageSpinner />
      ) : tutorial ? (
        <AppLayout>
          <AppFixedHeader css={{ height: 'initial' }}>
            <Title level={4} css={{ marginBottom: 0 }}>
              {tutorial.name}
            </Title>
          </AppFixedHeader>
          <Content>
            <TutorialViewer top={38} tutorial={tutorial} />
          </Content>
        </AppLayout>
      ) : (
        <ErrorContent>Failed to load tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
