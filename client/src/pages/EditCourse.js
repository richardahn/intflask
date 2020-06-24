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
const { Text } = Typography;

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

function EmptyMenuItem() {
  return (
    <li
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
      }}
    >
      <Text type="secondary">Empty</Text>
    </li>
  );
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

function CourseView({ course, onCourseChange }) {
  const [collapsedTopic, setCollapsedTopic] = useState(false);
  const onCollapseTopic = useCallback(
    (collapsed) => setCollapsedTopic(collapsed),
    [],
  );
  const [collapsedPage, setCollapsedPage] = useState(false);
  const onCollapsePage = useCallback(
    (collapsed) => setCollapsedPage(collapsed),
    [],
  );

  // Represents the currently selected topic and page, and the curren
  const [topicIndex, setTopicIndexRaw] = useState(null);
  const [pageIndex, setPageIndex] = useState(null);
  const setTopicIndex = useCallback(
    (topicIndex) => {
      setTopicIndexRaw(topicIndex);
      setPageIndex(null);
    },
    [course],
  );
  const setMain = useCallback(() => {
    setTopicIndexRaw(null);
    setPageIndex(null);
  }, []);

  const [breadcrumbItems, setBreadcrumbItems] = useState(null);
  const [content, setContent] = useState(null);
  useEffect(() => {
    // Set breadcrumb
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

    // Set content
    if (pageIndex != null) {
      setContent(course.topics[topicIndex].children[pageIndex].content);
    } else if (topicIndex != null) {
      setContent(course.topics[topicIndex].content);
    } else {
      setContent(course.main.content);
    }
  }, [topicIndex, pageIndex, course]);

  const addTopicGroup = useCallback(() => {
    const newTopics = course.topics.map((topic) => {
      const newTopic = {
        ...topic,
      };
      if (topic.children != null) {
        newTopic['children'] = topic.children.map((page) => ({ ...page }));
      }
      return newTopic;
    });
    newTopics.push({
      name: 'New Topic',
      content: 'Newly added topic group',
      children: [],
    });
    onCourseChange({ ...course, main: { ...course.main }, topics: newTopics });
  }, [course, onCourseChange]);
  const addTopic = useCallback(() => {
    const newTopics = course.topics.map((topic) => {
      const newTopic = {
        ...topic,
      };
      if (topic.children != null) {
        newTopic['children'] = topic.children.map((page) => ({ ...page }));
      }
      return newTopic;
    });
    newTopics.push({
      name: 'New Topic',
      content: 'Newly added topic page',
    });
    onCourseChange({ ...course, main: { ...course.main }, topics: newTopics });
  }, [course, onCourseChange]);
  const addPage = useCallback(() => {
    const newTopics = course.topics.map((topic, index) => {
      const newTopic = {
        ...topic,
      };
      if (topic.children != null) {
        newTopic['children'] = topic.children.map((page) => ({ ...page }));

        if (index === topicIndex) {
          newTopic.children.push({
            name: 'New Page',
            content: 'Newly added page',
          });
        }
      }
      return newTopic;
    });
    onCourseChange({ ...course, main: { ...course.main }, topics: newTopics });
  }, [course, onCourseChange, topicIndex]);

  // Debug
  console.log('-- Rendering EditCourse -- ');
  console.log(`Topic = ${topicIndex}, Page = ${pageIndex}`);
  console.log(course);
  console.log('');

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
        {topicIndex != null && course.topics[topicIndex].children && (
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
              {course.topics && course.topics.length > 0 ? (
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
                ))
              ) : (
                <EmptyMenuItem />
              )}
              <Menu.Divider />
              <Menu.Item icon={<PlusOutlined />} onClick={addTopicGroup}>
                Add Topic Group
              </Menu.Item>
              <Menu.Item icon={<PlusOutlined />} onClick={addTopic}>
                Add Topic
              </Menu.Item>
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
                {course.topics[topicIndex].children.length > 0 ? (
                  course.topics[topicIndex].children.map((item, index) => (
                    <Menu.Item key={index} onClick={() => setPageIndex(index)}>
                      {item.name}
                    </Menu.Item>
                  ))
                ) : (
                  <EmptyMenuItem />
                )}
                <Menu.Divider />
                <Menu.Item icon={<PlusOutlined />} onClick={addPage}>
                  Add Page
                </Menu.Item>
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

  const [course, setCourse] = useState({
    main: {
      content: 'Main Course',
    },
    topics: [],
  });

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title="React App Tutorial"
        subTitle="Editing Mode"
      />
      <Layout>
        <CourseView course={course} onCourseChange={setCourse} />
      </Layout>
    </React.Fragment>
  );
}
