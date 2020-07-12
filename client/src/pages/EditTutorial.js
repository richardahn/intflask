/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { message, Typography, Breadcrumb } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import TutorialEditor from '../components/EditTutorial/TutorialEditor';
import { parseTutorialContent } from '../utils/tutorial';
import { HomeOutlined } from '@ant-design/icons';

// -- Redux --
import { connect } from 'react-redux';
import { setTutorial, reset } from '../actions/editTutorial';

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

const { Title } = Typography;

export default function EditTutorial({ match }) {
  const { slug } = match.params;
  const [loadingPage, setLoadingPage] = useState(true);
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/admin/tutorials/${slug}`)
      .then((response) => setTutorial(parseTutorialContent(response.data)))
      .catch((error) => {
        console.error(error);
        message.error('Failed to get course');
      })
      .finally(() => setLoadingPage(false));
  }, [slug]);

  return (
    <AppLayout>
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
            onTutorialChange={setTutorial}
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
