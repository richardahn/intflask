/** @jsx jsx */
// -- General Imports --
import { HomeOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import { Breadcrumb, Layout, message, Typography } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, Prompt } from 'react-router-dom';
import TutorialEditor from '../components/EditTutorial/TutorialEditor';
import ErrorContent from '../components/ErrorContent';
import PageSpinner from '../components/PageSpinner';
import saveStates, { getNextState } from '../enums/saveStates';
// -- Css --
import {
  AppFixedHeader,
  AppLayout,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
} from '../styles';
import { parseTutorialContent, saveTutorial } from '../utils/tutorial';

const { Title } = Typography;
const { Content } = Layout;

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
        <Content css={{ display: 'flex' }}>
          <AppFixedHeader top={mainHeaderHeight} css={{ height: 'initial' }}>
            <Breadcrumb css={{ marginBottom: '1rem' }}>
              <Breadcrumb.Item>
                <RouterLink to="/admin">
                  <HomeOutlined /> Admin Home
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
        </Content>
      ) : (
        <ErrorContent>
          You are not authorized to edit this tutorial
        </ErrorContent>
      )}
    </AppLayout>
  );
}
