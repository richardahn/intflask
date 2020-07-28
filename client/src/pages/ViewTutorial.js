/** @jsx jsx */
// -- General Imports --
import { jsx } from '@emotion/core';
import { Layout, message, notification, Row, Typography } from 'antd';
import { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import ErrorContent from '../components/ErrorContent';
import IntflaskViewer from '../components/IntflaskViewer';
import PageSpinner from '../components/PageSpinner';
import TwoLevelFixedSidebar, {
  TutorialViewerSidebarInnerContent,
  TutorialViewerSidebarOuterContent,
} from '../components/TwoLevelFixedSidebar';
import { useGetEffect } from '../hooks/axios';
// -- Css --
import {
  AppFixedHeader,
  AppLayout,
  mainHeaderHeight,
  PaddedContent,
} from '../styles';
import {
  getCurrentPageFromSelection,
  getName,
  parseTutorialContent,
} from '../utils/tutorial';

// -- Css --
const { Title } = Typography;
const { Content } = Layout;

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

export default function ViewTutorial({ match, history }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useGetEffect(
    `/api/purchased-tutorials/${slug}`,
    {
      transformValue: (value) => parseTutorialContent(value),
      onError: (error) => {
        if (error.response.data.stripeNotConfirmed) {
          notification.info({
            message: 'Waiting for Purchase Confirmation',
            description: error.response.data.reason,
            duration: 0,
            placement: 'topLeft',
          });
        } else if (error.response.data.reason) {
          message.error(error.response.data.reason);
        } else {
          message.error('Failed to get tutorial.');
        }
        history.push(`/tutorial-preview/${slug}`);
      },
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
