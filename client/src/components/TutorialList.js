/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Space,
  List,
  Tag,
  Breadcrumb,
  Tooltip,
  Statistic,
} from 'antd';
import PageSpinner from '../components/PageSpinner';
import {
  LikeOutlined,
  StarOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  HomeOutlined,
  PlusOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { AppLayout, PaddedContent, AppHeader } from '../styles';
import FloatingActionButton from '../components/FloatingActionButton';

const { Content, Header } = Layout;
const { Title, Text, Link } = Typography;

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}
export function AdminTutorialListItem({ tutorial }) {
  console.log(tutorial);
  return (
    <List.Item
      key={tutorial.slug}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
      ]}
    >
      <List.Item.Meta
        css={css`
          .ant-list-item-meta-title {
            margin-bottom: 0;
          }
        `}
        title={
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <RouterLink
                css={{ marginRight: '1rem' }}
                to={`/admin/tutorial-dashboard/${tutorial.slug}`}
              >
                <Text>{tutorial.name}</Text>
              </RouterLink>
            </div>
            <div>
              {tutorial.deployed ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  deployed
                </Tag>
              ) : (
                <Tag icon={<MinusCircleOutlined />} color="default">
                  hidden
                </Tag>
              )}
            </div>
          </div>
        }
        description={
          <div>
            {tutorial.technologyStack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        }
      />
      {tutorial.description}
    </List.Item>
  );
}

export function TutorialListItem({ tutorial }) {
  return (
    <List.Item
      key={tutorial.slug}
      actions={[
        <IconText
          icon={StarOutlined}
          text={tutorial.statistics?.purchases}
          key="list-vertical-star-o"
        />,
      ]}
    >
      <List.Item.Meta
        css={css`
          .ant-list-item-meta-title {
            margin-bottom: 0;
          }
        `}
        title={
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <RouterLink to={`/`}>
              <Text>{tutorial.name}</Text>
            </RouterLink>
            {tutorial.price !== 0 ? (
              <Statistic value={tutorial.price} prefix="$" precision={2} />
            ) : (
              <Statistic value="Free" />
            )}
          </div>
        }
        description={
          <div>
            {tutorial.technologyStack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        }
      />
      {tutorial.description}
    </List.Item>
  );
}

export default function TutorialList({
  tutorials,
  pagination,
  footer,
  itemRenderer: Item,
}) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={pagination}
      dataSource={tutorials}
      footer={footer}
      renderItem={(tutorial) => <Item tutorial={tutorial} />}
    />
  );
}
