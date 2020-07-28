/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Divider, Empty, Layout, message, Skeleton, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import TutorialList, { TutorialListItem } from '../components/TutorialList';
import { mainHeaderHeight } from '../styles';

const { Content, Sider } = Layout;
const { Text } = Typography;

export default function Tutorials({ match }) {
  const { query } = match.params;
  const initialFilterState = {
    selectedTechnologies: [],
    selectedFree: false,
    sortedBy: 'popularity',
    descending: 'true',
    query,
  };
  const [filters, setFilters] = useState(initialFilterState);
  const [loadingTutorials, setLoadingTutorials] = useState(true);
  const [tutorials, setTutorials] = useState(null);
  console.log('filters', filters);
  useEffect(() => {
    setLoadingTutorials(true);
    axios
      .get('/api/tutorials', { params: filters })
      .then((response) => setTutorials(response.data))
      .catch((error) => {
        console.error(error);
        message.error('Failed to load tutorials');
      })
      .finally(() => setLoadingTutorials(false));
  }, [filters]);
  useEffect(() => setFilters({ ...initialFilterState }), [query]);

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        trigger={null}
        collapsedWidth="0"
        collapsed={collapsed}
      ></Sider>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        css={{
          height: `calc(100vh - ${mainHeaderHeight}px)`,
          position: 'fixed',
          left: 0,
          top: mainHeaderHeight,
          zIndex: 1,
        }}
      >
        <Filter
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters({ ...initialFilterState })}
        />
      </Sider>
      <Layout>
        <Content css={{ backgroundColor: 'white', padding: '0 50px' }}>
          <Divider orientation="left">
            Tutorials{' '}
            {query && (
              <Text type="secondary">(Search results for: {query})</Text>
            )}
          </Divider>
          {loadingTutorials ? (
            <Skeleton active />
          ) : tutorials ? (
            tutorials.length > 0 ? (
              <TutorialList
                tutorials={tutorials}
                itemRenderer={TutorialListItem}
              />
            ) : (
              <Empty description="No Tutorials" />
            )
          ) : (
            <Empty description="Could not fetch tutorials" />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
