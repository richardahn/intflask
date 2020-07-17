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
  PaddedContent,
} from '../styles';
import PageSpinner from '../components/PageSpinner';
import ErrorContent from '../components/ErrorContent';
import saveStates, { getNextState } from '../enums/saveStates';
import { useApiGet } from '../hooks/useApi';

const { Title } = Typography;

function Tutorial({ tutorial }) {
  return <div>{tutorial.name}</div>;
}

export default function ViewTutorial({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useApiGet(`/api/tutorials/${slug}`, {
    onError: () => message.error('Failed to load tutorial'),
  });
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PageSpinner />
      ) : tutorial ? (
        <PaddedContent>
          <Tutorial tutorial={tutorial} />
        </PaddedContent>
      ) : (
        <ErrorContent>Failed to load tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
