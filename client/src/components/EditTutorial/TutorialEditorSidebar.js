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
import {
  reducePageGroup,
  reducePage,
  reduceSubpage,
} from '../../utils/tutorial';
import { arrayEquals } from '../../utils/array';

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

import TwoLevelFixedSidebar, {
  TutorialEditorSidebarOuterContent,
  TutorialEditorSidebarInnerContent,
} from '../TwoLevelFixedSidebar';

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

export default function TutorialEditorSidebar({
  tutorial,
  currentSelectionPath,
  onTutorialChange,
  onCurrentSelectionChange,
  currentPage,
}) {
  return (
    <TwoLevelFixedSidebar
      top={mainHeaderHeight + pageHeaderHeight + statusBarHeight}
      outerVisible={true}
      innerVisible={
        (currentSelectionPath.length === 1 && currentPage.children) ||
        currentSelectionPath.length === 2
      }
      outerContent={
        <TutorialEditorSidebarOuterContent
          tutorial={tutorial}
          currentSelectionPath={currentSelectionPath}
          onTutorialChange={onTutorialChange}
          onCurrentSelectionChange={onCurrentSelectionChange}
        />
      }
      innerContent={
        <TutorialEditorSidebarInnerContent
          tutorial={tutorial}
          currentSelectionPath={currentSelectionPath}
          onTutorialChange={onTutorialChange}
          onCurrentSelectionChange={onCurrentSelectionChange}
        />
      }
    />
  );
}
