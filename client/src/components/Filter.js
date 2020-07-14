/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  List,
  Space,
  Avatar,
  message,
  Skeleton,
  Empty,
  Divider,
  Dropdown,
  Select,
  Checkbox,
  Button,
} from 'antd';
import {
  GoogleOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { useApiGet } from '../hooks/useApi';

const { Content, Header, Footer, Sider } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

function Padding({ children, ...props }) {
  return (
    <div css={{ padding: '0 2rem' }} {...props}>
      {children}
    </div>
  );
}
function Label({ children, inline, ...props }) {
  return (
    <Text
      strong
      css={{ display: inline ? 'inline-block' : 'block' }}
      {...props}
    >
      {children}
    </Text>
  );
}

export default function Filter({ filters, onChange }) {
  // Get search value from string query in url
  const [, allTechnologies] = useApiGet('/api/technologies', {
    onError: () => message.error('Failed to load technology filters'),
    defaultData: [],
  });
  const {
    selectedTechnologies = [],
    selectedFree = false,
    sortedBy = 'popularity',
    descending = 'true',
  } = filters;
  const onSelectedTechnologiesChange = useCallback((value) => {
    onChange((filters) => ({ ...filters, selectedTechnologies: value }));
  }, []);
  const onSelectedFreeChange = useCallback((event) => {
    const value = event.target.checked;
    onChange((filters) => ({ ...filters, selectedFree: value }));
  }, []);
  const onSortedByChange = useCallback((value) => {
    onChange((filters) => ({ ...filters, sortedBy: value }));
  }, []);
  const descendingChange = useCallback((value) => {
    onChange((filters) => ({ ...filters, descending: value }));
  }, []);
  console.log(filters);
  return (
    <React.Fragment>
      <Padding
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label>Filter</Label>
        <Button
          size="small"
          onClick={() =>
            onChange({
              selectedTechnologies: [],
              selectedFree: false,
              sortedBy: 'popularity',
              descending: 'true',
            })
          }
        >
          <Text type="secondary">Clear All</Text>
        </Button>
      </Padding>
      <Divider css={{ margin: '0.5rem 0' }} />
      <Padding>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Label>Sort by</Label>
            <Row gutter={[0, 4]}>
              <Col span={24}>
                <Select
                  value={sortedBy}
                  onChange={onSortedByChange}
                  css={{ width: '100%' }}
                >
                  <Option value="popularity">Popularity</Option>
                  <Option value="price">Price</Option>
                  <Option value="name">Name</Option>
                </Select>
              </Col>
              <Col span={24}>
                <Select
                  value={descending}
                  onChange={descendingChange}
                  css={{ width: '100%' }}
                >
                  <Option value="true">Descending</Option>
                  <Option value="false">Ascending</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Label>Technology</Label>
            <Select
              mode="multiple"
              css={{ width: '100%' }}
              onChange={onSelectedTechnologiesChange}
              value={selectedTechnologies}
              placeholder="Enter tags..."
            >
              {allTechnologies.map((i) => (
                <Option key={i}>{i}</Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>
            <Space>
              <Label inline>Free</Label>
              <Checkbox
                onChange={onSelectedFreeChange}
                checked={selectedFree}
              />
            </Space>
          </Col>
        </Row>
      </Padding>
    </React.Fragment>
  );
}
