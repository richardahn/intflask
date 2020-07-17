/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { message, Typography, Breadcrumb } from 'antd';
import { Link as RouterLink, Prompt } from 'react-router-dom';
import TutorialEditor from '../components/EditTutorial/TutorialEditor';
import { parseTutorialContent, saveTutorial } from '../utils/tutorial';
import { HomeOutlined } from '@ant-design/icons';

// -- Css --
import {
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  paddedContentCss,
  AppLayout,
  AppHeader,
  AppFixedHeader,
} from '../styles';
import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';
import saveStates, { getNextState } from '../enums/saveStates';

const { Title } = Typography;

export default function EditTutorial({ match }) {
  const { slug } = match.params;
  const [loadingPage, setLoadingPage] = useState(true);
  const [saveState, setSaveState] = useState(saveStates.SAVED);
  const [tutorial, setTutorial] = useState(null);
  const onTutorialChange = useCallback((tutorial) => {
    setSaveState((prevState) => getNextState(prevState, saveStates.MODIFIED));
    setTutorial(tutorial);
  }, []);

  useEffect(() => {
    if (tutorial) {
      saveTutorial(tutorial, (state) =>
        setSaveState((prevState) => getNextState(prevState, state)),
      );
    }
  }, [tutorial]);

  useEffect(() => {
    axios
      .get(`/api/admin/tutorials/${slug}`)
      .then((response) => setTutorial(parseTutorialContent(response.data)))
      .catch((error) => {
        console.error(error);
        message.error('Failed to get tutorial');
      })
      .finally(() => setLoadingPage(false));
  }, [slug]);

  return (
    <AppLayout>
      <Prompt
        when={saveState !== saveStates.SAVED}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      {loadingPage ? (
        <PageSpinner />
      ) : tutorial ? (
        <React.Fragment>
          <AppFixedHeader top={mainHeaderHeight} css={{ height: 'initial' }}>
            <Breadcrumb css={{ marginBottom: '1rem' }}>
              <Breadcrumb.Item>
                <RouterLink to="/admin">
                  <HomeOutlined /> Created Tutorials
                </RouterLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <RouterLink to={`/admin/tutorial-dashboard/${slug}`}>
                  Dashboard
                </RouterLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={4} css={{ marginBottom: 0 }}>
              {tutorial.name}
            </Title>
          </AppFixedHeader>
          <TutorialEditor
            top={pageHeaderHeight + statusBarHeight}
            tutorial={tutorial}
            onTutorialChange={onTutorialChange}
            saveState={saveState}
          />
        </React.Fragment>
      ) : (
        <ErrorContent>
          You are not authorized to edit this tutorial
        </ErrorContent>
      )}
    </AppLayout>
  );
}
