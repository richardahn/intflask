/** @jsx jsx */
// -- General Imports --
import { jsx } from '@emotion/core';
// -- Css --
import {
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
} from '../../styles';
import TwoLevelFixedSidebar, {
  TutorialEditorSidebarInnerContent,
  TutorialEditorSidebarOuterContent,
} from '../TwoLevelFixedSidebar';

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
