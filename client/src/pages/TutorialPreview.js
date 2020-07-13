/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Carousel,
  Button,
  Divider,
  message,
  Skeleton,
  Empty,
  Descriptions,
  Typography,
  Rate,
  Tree,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Tags from '../components/Tags';
import ErrorContent from '../components/ErrorContent';
import { AppLayout, PaddedContent } from '../styles';
import { useApiGet } from '../hooks/useApi';
import axios from 'axios';

const { Content } = Layout;
const { Text } = Typography;

export default function TutorialPreview({ match }) {
  const { slug } = match.params;
  const [loadingTutorial, tutorial] = useApiGet(`/api/tutorials/${slug}`, {
    onError: () => message.error('Failed to fetch tutorial'),
  });
  const purchaseTutorial = useCallback(() => {
    axios
      .post(`/api/purchase/${slug}`)
      .then(() => {
        message.success('Successfully purchased tutorial');
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to purchase tutorial');
      });
  }, [slug]);
  return (
    <AppLayout>
      {loadingTutorial ? (
        <PaddedContent>
          <Skeleton />
        </PaddedContent>
      ) : tutorial ? (
        <PaddedContent>
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 css={{ display: 'inline', marginRight: '0.5rem' }}>
                {tutorial.name}
              </h2>
              <Text type="secondary">200+ people enrolled</Text>
            </div>
            {tutorial.price === 0 ? (
              <Button onClick={purchaseTutorial}>Enroll</Button>
            ) : (
              <Button type="primary" onClick={purchaseTutorial}>
                Buy ${tutorial.price}
              </Button>
            )}
          </div>
          <Divider orientation="left">Details</Divider>
          <Descriptions bordered>
            <Descriptions.Item label="Author">
              {tutorial.userId.firstName + ' ' + tutorial.userId.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Technology Stack">
              <Tags tags={tutorial.technologyStack} />
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              <Rate disabled defaultValue={4} />{' '}
              <Text type="secondary">32 ratings</Text>
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Outline</Divider>
          <Tree
            treeData={tutorial.outline}
            switcherIcon={<DownOutlined />}
            showLine
          />
          <Divider orientation="left">Reviews</Divider>
        </PaddedContent>
      ) : (
        <ErrorContent>Failed to fetch tutorial</ErrorContent>
      )}
    </AppLayout>
  );
}
