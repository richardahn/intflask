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
  addPageGroup,
  addPage,
  addSubpage,
  setCurrentPath,
} from '../../actions/editTutorial';

// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  tutorialSidebarWidth,
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

function TutorialEditorSidebar({
  currentPath,
  tutorial,
  addPageGroup,
  addPage,
  addSubpage,
  setCurrentPath,
}) {
  const [collapsedOuter, setCollapsedOuter] = useState(false);
  const onCollapseOuter = useCallback(
    (collapsed) => setCollapsedOuter(collapsed),
    [],
  );
  const [collapsedInner, setCollapsedInner] = useState(false);
  const onCollapseInner = useCallback(
    (collapsed) => setCollapsedInner(collapsed),
    [],
  );

  return (
    tutorial != null &&
    currentPath != null && (
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
          collapsed={collapsedOuter}
          onCollapse={onCollapseOuter}
          width={tutorialSidebarWidth}
          key="outerSidebarFiller"
        ></Sider>
        {currentPath.length === 2 && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedInner}
            onCollapse={onCollapseInner}
            width={tutorialSidebarWidth}
            key="innerSidebarFiller"
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
          {/* Outer Sidebar */}
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedOuter}
            onCollapse={onCollapseOuter}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedOuterSidebar"
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[
                currentPath.length === 0 ? '-1' : String(currentPath[0]),
              ]}
            >
              <Menu.Item
                key="-1"
                css={{ fontWeight: 'bold' }}
                icon={<HomeOutlined />}
                onClick={() => setCurrentPath([])}
              >
                Main
              </Menu.Item>
              <Menu.Divider />
              {tutorial.content.children.length > 0 ? (
                tutorial.data.children.map((outer, i) => (
                  <Menu.Item
                    key={i}
                    css={{ fontWeight: 'bold' }}
                    onClick={() => setCurrentPath([i])}
                    icon={
                      outer.children != null ? (
                        <FolderOutlined />
                      ) : (
                        <FileOutlined />
                      )
                    }
                  >
                    {outer.name}
                  </Menu.Item>
                ))
              ) : (
                <EmptyMenuItem />
              )}
              <Menu.Divider />
              <Menu.Item icon={<PlusOutlined />} onClick={addPageGroup}>
                Add Page Group
              </Menu.Item>
              <Menu.Item icon={<PlusOutlined />} onClick={addPage}>
                Add Page
              </Menu.Item>
            </Menu>
          </Sider>
          {/* Inner Sidebar */}
          {currentPath.length === 2 && (
            <Sider
              theme="light"
              collapsible
              collapsed={collapsedInner}
              onCollapse={onCollapseInner}
              width={tutorialSidebarWidth}
              css={scrollbarCss}
              key="fixedInnerSidebar"
            >
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={[String(currentPath[1])]}
              >
                {tutorial.data.children[currentPath[0]].children.length > 0 ? (
                  tutorial.data.children[currentPath[0]].children.map(
                    (inner, j) => (
                      <Menu.Item
                        key={j}
                        onClick={() => setCurrentPath([currentPath[0], j])}
                      >
                        {inner.name}
                      </Menu.Item>
                    ),
                  )
                ) : (
                  <EmptyMenuItem />
                )}
                <Menu.Divider />
                <Menu.Item icon={<PlusOutlined />} onClick={addSubpage}>
                  Add Page
                </Menu.Item>
              </Menu>
            </Sider>
          )}
        </div>
      </div>
    )
  );
}

const mapStateToProps = (state) => ({
  currentPath: state.editTutorial.currentPath,
  tutorial: state.editTutorial.tutorial,
});
const mapDispatchToProps = {
  addPageGroup,
  addPage,
  addSubpage,
  setCurrentPath,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorialEditorSidebar);
