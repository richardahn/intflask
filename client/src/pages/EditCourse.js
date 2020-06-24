/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Typography, PageHeader, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons';

// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  fixedHeaderCss,
  fixedHeaderCssAtHeight,
  paddedContentCss,
} from '../styles';

// -- Setup --
const scrollbarCss = [
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)', // 48px comes from the fixed footer to minimize the sidebar
  },
  baseScrollbarCss,
];

const { Content, Header, Sider } = Layout;

const mainHeaderHeight = 64;
const pageHeaderHeight = 72;
const statusBarHeight = 24;
const courseSidebarWidth = 200;

class TopicGroup {
  constructor(name, content, children) {
    this.name = name;
    this.content = content;
    this.children = children;
  }
}
class TopicOrPage {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

function Breadcrumbs({ items }) {
  return (
    <Breadcrumb>
      {items &&
        items.map((item, index) => (
          <Breadcrumb.Item onClick={item.onClick} key={index}>
            {index === items.length - 1 ? item.content : <a>{item.content}</a>}
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
}

function CourseView({ course }) {
  const [collapsedTopic, setCollapsedTopic] = useState(false);
  const onCollapseTopic = useCallback(
    (collapsed) => setCollapsedTopic(collapsed),
    [setCollapsedTopic],
  );

  const [collapsedPage, setCollapsedPage] = useState(false);
  const onCollapsePage = useCallback(
    (collapsed) => setCollapsedPage(collapsed),
    [setCollapsedPage],
  );

  const [topicIndex, setTopicIndexRaw] = useState(null);
  const [pageIndex, setPageIndexRaw] = useState(null);
  const [content, setContent] = useState(course.main.content);
  const [breadcrumbItems, setBreadcrumbItems] = useState(null);
  const setPageIndex = useCallback(
    (pageIndex) => {
      setPageIndexRaw(pageIndex);
      setContent(course.topics[topicIndex].children[pageIndex].content);
    },
    [course, topicIndex, setPageIndexRaw, setContent],
  );
  const setTopicIndex = useCallback(
    (topicIndex) => {
      setTopicIndexRaw(topicIndex);
      setPageIndexRaw(null);
      setContent(course.topics[topicIndex].content);
    },
    [course, setTopicIndexRaw, setPageIndexRaw, setContent],
  );
  const setMain = useCallback(() => {
    setTopicIndexRaw(null);
    setPageIndexRaw(null);
    setContent(course.main.content);
  }, [course, setTopicIndexRaw, setPageIndexRaw]);

  useEffect(() => {
    const items = [{ content: <HomeOutlined />, onClick: setMain }];
    if (topicIndex != null) {
      items.push({
        content: course.topics[topicIndex].name,
        onClick: () => setTopicIndex(topicIndex),
      });
    }
    if (pageIndex != null) {
      items.push({
        content: course.topics[topicIndex].children[pageIndex].name,
      });
    }
    setBreadcrumbItems(items);
  }, [setMain, setTopicIndex, topicIndex, pageIndex, course]);
  console.log(`Topic = ${topicIndex}, Page = ${pageIndex}`);
  return (
    <React.Fragment>
      {/* Status Bar */}
      <div
        css={[
          {
            height: `${statusBarHeight}px`,
          },
          fixedHeaderCssAtHeight(mainHeaderHeight + pageHeaderHeight),
        ]}
      >
        <div css={{ marginLeft: '1.5rem' }}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Sidebar */}
      <div
        css={{
          height: `calc(100vh - ${
            mainHeaderHeight + pageHeaderHeight + statusBarHeight
          }px)`,
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        {/* Filler Sidebar(takes up the space that the fixed sidebar would use) */}
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedTopic}
          onCollapse={onCollapseTopic}
          width={courseSidebarWidth}
        ></Sider>
        {topicIndex != null &&
          course.topics[topicIndex].children &&
          course.topics[topicIndex].children.length > 0 && (
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedPage}
              onCollapse={onCollapsePage}
              width={courseSidebarWidth}
            ></Sider>
          )}

        {/* Fixed Sidebar Container */}
        <div
          css={{
            position: 'fixed',
            left: 0,
            top: `${mainHeaderHeight + pageHeaderHeight + statusBarHeight}px`,
            height: `calc(100vh - ${
              mainHeaderHeight + pageHeaderHeight + statusBarHeight
            }px)`,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {/* Topic Sidebar */}
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedTopic}
            onCollapse={onCollapseTopic}
            width={courseSidebarWidth}
            css={scrollbarCss}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[String(topicIndex)]}
            >
              <Menu.Item
                key="null"
                css={{ fontWeight: 'bold' }}
                icon={<HomeOutlined />}
                onClick={setMain}
              >
                Main
              </Menu.Item>
              <Menu.Divider />
              {course.topics &&
                course.topics.map((item, index) => (
                  <Menu.Item
                    key={index}
                    css={{ fontWeight: 'bold' }}
                    onClick={() => setTopicIndex(index)}
                    icon={
                      item.children != null ? (
                        <FolderOutlined />
                      ) : (
                        <FileOutlined />
                      )
                    }
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              <Menu.Divider />
              <Menu.Item icon={<PlusOutlined />}>Add Topic Group</Menu.Item>
              <Menu.Item icon={<PlusOutlined />}>Add Topic</Menu.Item>
            </Menu>
          </Sider>
          {/* Pages Sidebar */}
          {topicIndex != null && course.topics[topicIndex].children && (
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedPage}
              onCollapse={onCollapsePage}
              width={courseSidebarWidth}
              css={scrollbarCss}
            >
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={[String(pageIndex)]}
              >
                {course.topics[topicIndex].children.map((item, index) => (
                  <Menu.Item key={index} onClick={() => setPageIndex(index)}>
                    {item.name}
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item icon={<PlusOutlined />}>Add Page</Menu.Item>
              </Menu>
            </Sider>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Content
        css={[
          {
            marginTop: `${pageHeaderHeight + statusBarHeight}px`,
          },
          paddedContentCss,
        ]}
      >
        {content}
      </Content>
    </React.Fragment>
  );
}

export default function EditCourse({ match, history }) {
  const { courseId, pageId } = match.params;
  const onBack = useCallback(() => history.goBack(), [history]);

  const course = {
    main: {
      content: 'hey this is main',
    },
    topics: [
      {
        name: 'Topic 1',
        content: 'hey this is Topic 1',
        children: [
          { name: 'Subtopic 1', content: 'h1' },
          { name: 'Subtopic 2', content: 'h2' },
          { name: 'Subtopic 3', content: 'h3' },
          { name: 'Subtopic 4', content: 'h4' },
        ],
      },
      {
        name: 'Topic 2',
        content: 'hey this is Topic 2',
        children: [
          { name: 'Subtopic 1', content: 'h1' },
          { name: 'Subtopic 2', content: 'h2' },
          { name: 'Subtopic 3', content: 'h3' },
          { name: 'Subtopic 4', content: 'h4' },
        ],
      },
      {
        name: 'Review',
        content: 'hey this is Review',
      },
      {
        name: 'Topic 3',
        content: 'hey this is Topic 3',
        children: [
          { name: 'Subtopic 1', content: 'h1' },
          { name: 'Subtopic 2', content: 'h2' },
          { name: 'Subtopic 3', content: 'h3' },
          { name: 'Subtopic 4', content: 'h4' },
        ],
      },
      {
        name: 'Topic 4',
        content: 'hey this is Topic 4',
        children: [
          { name: 'Subtopic 1', content: 'h1' },
          { name: 'Subtopic 2', content: 'h2' },
          { name: 'Subtopic 3', content: 'h3' },
          { name: 'Subtopic 4', content: 'h4' },
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title="Edit Course"
        subTitle="Course 777"
      />
      <Layout>
        <CourseView course={course} />
      </Layout>
    </React.Fragment>
  );
}
