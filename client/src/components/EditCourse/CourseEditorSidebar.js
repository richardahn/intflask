/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { EmptyMenuItem } from '../intflask-antd';
import {
  HomeOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons';

// -- Redux --
import { connect } from 'react-redux';
import {
  addTopicGroup,
  addTopic,
  addPage,
  setTopicIndex,
  setPageIndex,
  setMain,
} from '../../actions/editCourse';

// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  courseSidebarWidth,
} from '../../styles';

// -- Setup --
const scrollbarCss = [
  {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 48px)', // 48px comes from the fixed footer to minimize the sidebar
  },
  baseScrollbarCss,
];
const { Sider } = Layout;

function CourseEditorSidebar({
  currentTopicIndex,
  currentPageIndex,
  course,
  addTopicGroup,
  addTopic,
  addPage,
  setTopicIndex,
  setPageIndex,
  setMain,
}) {
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

  const showTopicsSidebar = course != null && course.topics != null;
  const showPagesSidebar =
    course != null &&
    currentTopicIndex != null &&
    course.topics[currentTopicIndex].children != null;

  return (
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
      {showTopicsSidebar && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedTopic}
          onCollapse={onCollapseTopic}
          width={courseSidebarWidth}
          key="topicsSidebarFiller"
        ></Sider>
      )}
      {showPagesSidebar && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedPage}
          onCollapse={onCollapsePage}
          width={courseSidebarWidth}
          key="pagesSidebarFiller"
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
        key="fixedSidebarContainer"
      >
        {/* Topic Sidebar */}
        {showTopicsSidebar && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedTopic}
            onCollapse={onCollapseTopic}
            width={courseSidebarWidth}
            css={scrollbarCss}
            key="fixedTopicsSidebar"
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[String(currentTopicIndex)]}
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
              {showTopicsSidebar && course.topics.length > 0 ? (
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
        )}
        {/* Pages Sidebar */}
        {showPagesSidebar && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedPage}
            onCollapse={onCollapsePage}
            width={courseSidebarWidth}
            css={scrollbarCss}
            key="fixedPagesSidebar"
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[String(currentPageIndex)]}
            >
              {course.topics[currentTopicIndex].children.length > 0 ? (
                course.topics[currentTopicIndex].children.map((item, index) => (
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
  );
}

const mapStateToProps = (state) => ({
  currentTopicIndex: state.editCourse.currentTopicIndex,
  currentPageIndex: state.editCourse.currentPageIndex,
  course: state.editCourse.course,
});
const mapDispatchToProps = {
  addTopicGroup,
  addTopic,
  addPage,
  setTopicIndex,
  setPageIndex,
  setMain,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseEditorSidebar);
