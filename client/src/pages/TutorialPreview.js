/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import {
  Layout,
  Carousel,
  Button,
  Divider,
  message,
  Skeleton,
  Empty,
  Descriptions,
} from 'antd';
import Tags from '../components/Tags';
import ErrorContent from '../components/ErrorContent';
import { AppLayout, PaddedContent } from '../styles';
import { useApiGet } from '../hooks/useApi';

const { Content } = Layout;

export default function TutorialPreview({ match }) {
  const [
    loadingTutorial,
    tutorial,
  ] = useApiGet(`/api/tutorials/${match.params.slug}`, null, () =>
    message.error('Failed to fetch tutorial'),
  );
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PaddedContent>
          <Skeleton />
        </PaddedContent>
      ) : tutorial ? (
        <PaddedContent>
          <Divider orientation="left">{tutorial.name}</Divider>
          <Descriptions title={tutorial.name} bordered>
            <Descriptions.Item label="Author">
              {tutorial.userId.firstName + ' ' + tutorial.userId.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Technology Stack">
              <Tags tags={tutorial.technologyStack} />
            </Descriptions.Item>
          </Descriptions>
        </PaddedContent>
      ) : (
        <ErrorContent>Failed to fetch tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
