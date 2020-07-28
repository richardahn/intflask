/** @jsx jsx */
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { css, jsx } from '@emotion/core';
import { List, Space, Statistic, Tag, Typography } from 'antd';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Tags from './Tags';

const { Text } = Typography;

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
    <List.Item key={tutorial.slug}>
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
            <Tags tags={tutorial.technologyStack} />
          </div>
        }
      />
      {tutorial.description}
    </List.Item>
  );
}

export function PurchasedTutorialListItem({ tutorial }) {
  return (
    <List.Item key={tutorial.slug}>
      <List.Item.Meta
        css={css`
          .ant-list-item-meta-title {
            margin-bottom: 0;
          }
        `}
        title={
          <RouterLink to={`/tutorial-preview/${tutorial.slug}`}>
            <Text>{tutorial.name}</Text>
          </RouterLink>
        }
        description={
          <div>
            <Tags tags={tutorial.technologyStack} />
          </div>
        }
      />
      {tutorial.description}
    </List.Item>
  );
}

export function TutorialListItem({ tutorial }) {
  return (
    <List.Item key={tutorial.slug}>
      <List.Item.Meta
        css={css`
          .ant-list-item-meta-title {
            margin-bottom: 0;
          }
        `}
        title={
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <RouterLink to={`/tutorial-preview/${tutorial.slug}`}>
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
            <Tags tags={tutorial.technologyStack} />
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
