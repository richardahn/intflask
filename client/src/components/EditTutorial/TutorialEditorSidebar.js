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

function generateNewEditorContent() {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
}
function generateNewPageGroup() {
  return {
    name: 'New Topic',
    content: generateNewEditorContent(),
    children: [],
  };
}
function generateNewPage() {
  return { name: 'New Topic', content: generateNewEditorContent() };
}
function generateNewSubpage() {
  return { name: 'New Page', content: generateNewEditorContent() };
}

function reducePageBase(tutorial, page) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: [...tutorial.content.children, page],
    },
  };
}
function reducePageGroup(tutorial) {
  return reducePageBase(tutorial, generateNewPageGroup());
}
function reducePage(tutorial) {
  return reducePageBase(tutorial, generateNewPage());
}
function reduceSubpage(tutorial, current) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.map((page, i) =>
        i === current
          ? { ...page, children: [...page.children, generateNewSubpage()] }
          : page,
      ),
    },
  };
}

export default function TutorialEditorSidebar({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
  currentPage,
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

  const addPageGroup = useCallback(() => {
    onTutorialChange(reducePageGroup(tutorial));
  }, [tutorial]);
  const addPage = useCallback(() => {
    onTutorialChange(reducePage(tutorial));
  }, [tutorial]);
  const addSubpage = useCallback(
    (currentI) => {
      onTutorialChange(reduceSubpage(tutorial, currentI));
    },
    [tutorial],
  );

  const showInnerSidebar =
    (currentSelectionPath.length === 1 && currentPage.children) ||
    currentSelectionPath.length === 2;

  console.log('tut', tutorial);
  console.log('selection', currentSelectionPath);
  return (
    tutorial != null &&
    currentSelectionPath != null && (
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
        {showInnerSidebar && (
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
                currentSelectionPath.length === 0
                  ? '-1'
                  : String(currentSelectionPath[0]),
              ]}
            >
              <Menu.Item
                key="-1"
                css={{ fontWeight: 'bold' }}
                icon={<HomeOutlined />}
                onClick={() => onCurrentSelectionChange([])}
              >
                Main
              </Menu.Item>
              <Menu.Divider />
              {tutorial.content.children.length > 0 ? (
                tutorial.content.children.map((outer, i) => (
                  <Menu.Item
                    key={i}
                    css={{ fontWeight: 'bold' }}
                    onClick={() => onCurrentSelectionChange([i])}
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
          {showInnerSidebar && (
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
                selectedKeys={[String(currentSelectionPath[1])]}
              >
                {tutorial.content.children[currentSelectionPath[0]].children
                  .length > 0 ? (
                  tutorial.content.children[
                    currentSelectionPath[0]
                  ].children.map((inner, j) => (
                    <Menu.Item
                      key={j}
                      onClick={() =>
                        onCurrentSelectionChange([currentSelectionPath[0], j])
                      }
                    >
                      {inner.name}
                    </Menu.Item>
                  ))
                ) : (
                  <EmptyMenuItem />
                )}
                <Menu.Divider />
                <Menu.Item
                  icon={<PlusOutlined />}
                  onClick={() => addSubpage(currentSelectionPath[0])}
                >
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
