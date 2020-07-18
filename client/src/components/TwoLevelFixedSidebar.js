/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { EmptyMenuItem } from './intflask-antd';
import {
  HomeOutlined,
  PlusOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { reducePageGroup, reducePage, reduceSubpage } from '../utils/tutorial';
import { arrayEquals } from '../utils/array';

// -- Redux --
import { connect } from 'react-redux';

// -- Css --
import {
  scrollbarCss as baseScrollbarCss,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
  tutorialSidebarWidth,
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
const { Sider } = Layout;

export default function TwoLevelFixedSidebar({
  top,
  outerVisible,
  innerVisible,
  outerContent,
  innerContent,
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
    <div
      css={{
        height: `calc(100vh - ${top}px)`,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      {/* Filler Sidebar(takes up the space that the fixed sidebar would use) */}
      {outerVisible && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsedOuter}
          onCollapse={onCollapseOuter}
          width={tutorialSidebarWidth}
          key="outerSidebarFiller"
        ></Sider>
      )}
      {innerVisible && (
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
          top: `${top}px`,
          height: `calc(100vh - ${top}px)`,
          display: 'flex',
          flexDirection: 'row',
        }}
        key="fixedSidebarContainer"
      >
        {/* Outer Sidebar */}
        {outerVisible && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedOuter}
            onCollapse={onCollapseOuter}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedOuterSidebar"
          >
            {outerContent}
          </Sider>
        )}
        {/* Inner Sidebar */}
        {innerVisible && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsedInner}
            onCollapse={onCollapseInner}
            width={tutorialSidebarWidth}
            css={scrollbarCss}
            key="fixedInnerSidebar"
          >
            {innerContent}
          </Sider>
        )}
      </div>
    </div>
  );
}

export function TutorialEditorSidebarOuterContent({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
}) {
  const addPageGroup = useCallback(() => {
    onTutorialChange(reducePageGroup(tutorial));
  }, [tutorial]);
  const addPage = useCallback(() => {
    onTutorialChange(reducePage(tutorial));
  }, [tutorial]);
  return (
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
        onClick={() => {
          if (!arrayEquals(currentSelectionPath, [])) {
            onCurrentSelectionChange([]);
          }
        }}
      >
        Main
      </Menu.Item>
      <Menu.Divider />
      {tutorial.content.children.length > 0 ? (
        tutorial.content.children.map((outer, i) => (
          <Menu.Item
            key={i}
            css={{ fontWeight: 'bold' }}
            onClick={() => {
              if (!arrayEquals(currentSelectionPath, [i])) {
                onCurrentSelectionChange([i]);
              }
            }}
            icon={
              outer.children != null ? <FolderOutlined /> : <FileOutlined />
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
  );
}

export function TutorialEditorSidebarInnerContent({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
}) {
  const addSubpage = useCallback(
    (currentI) => {
      onTutorialChange(reduceSubpage(tutorial, currentI));
    },
    [tutorial],
  );
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[String(currentSelectionPath[1])]}
    >
      {tutorial.content.children[currentSelectionPath[0]].children.length >
      0 ? (
        tutorial.content.children[currentSelectionPath[0]].children.map(
          (inner, j) => (
            <Menu.Item
              key={j}
              onClick={() => {
                if (
                  !arrayEquals(currentSelectionPath, [
                    currentSelectionPath[0],
                    j,
                  ])
                ) {
                  onCurrentSelectionChange([currentSelectionPath[0], j]);
                }
              }}
            >
              {inner.name}
            </Menu.Item>
          ),
        )
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
  );
}

export function TutorialViewerSidebarOuterContent({
  tutorial,
  currentSelectionPath,
  onCurrentSelectionChange,
}) {
  return (
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
        onClick={() => {
          if (!arrayEquals(currentSelectionPath, [])) {
            onCurrentSelectionChange([]);
          }
        }}
      >
        Main
      </Menu.Item>
      <Menu.Divider />
      {tutorial.content.children.length > 0 ? (
        tutorial.content.children.map((outer, i) => (
          <Menu.Item
            key={i}
            css={{ fontWeight: 'bold' }}
            onClick={() => {
              if (!arrayEquals(currentSelectionPath, [i])) {
                onCurrentSelectionChange([i]);
              }
            }}
            icon={
              outer.children != null ? <FolderOutlined /> : <FileOutlined />
            }
          >
            {outer.name}
          </Menu.Item>
        ))
      ) : (
        <EmptyMenuItem />
      )}
    </Menu>
  );
}

export function TutorialViewerSidebarInnerContent({
  tutorial,
  currentSelectionPath,
  onCurrentSelectionChange,
}) {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[String(currentSelectionPath[1])]}
    >
      {tutorial.content.children[currentSelectionPath[0]].children.length >
      0 ? (
        tutorial.content.children[currentSelectionPath[0]].children.map(
          (inner, j) => (
            <Menu.Item
              key={j}
              onClick={() => {
                if (
                  !arrayEquals(currentSelectionPath, [
                    currentSelectionPath[0],
                    j,
                  ])
                ) {
                  onCurrentSelectionChange([currentSelectionPath[0], j]);
                }
              }}
            >
              {inner.name}
            </Menu.Item>
          ),
        )
      ) : (
        <EmptyMenuItem />
      )}
    </Menu>
  );
}
