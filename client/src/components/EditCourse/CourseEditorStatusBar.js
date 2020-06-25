/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import { Breadcrumbs } from '../intflask-antd';
import {
  HomeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import saveStates from '../../enums/courseEditorSaveStates';

// -- Redux --
import { connect } from 'react-redux';
import { setTopicIndex, setMain } from '../../actions/editCourse';

// -- Css --
import {
  fixedHeaderCssAtHeight,
  mainHeaderHeight,
  pageHeaderHeight,
  statusBarHeight,
} from '../../styles';

function saveStateToTag(saveState) {
  switch (saveState) {
    case null:
      return (
        <Tag color="default" icon={<SyncOutlined spin />}>
          loading
        </Tag>
      );
    case saveStates.UNSAVED:
      return (
        <Tag color="warning" icon={<ClockCircleOutlined />}>
          unsaved
        </Tag>
      );
    case saveStates.SAVING:
      return (
        <Tag color="processing" icon={<SyncOutlined spin />}>
          saving
        </Tag>
      );
    case saveStates.SAVED:
      return (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          saved
        </Tag>
      );
    default:
      return <Tag>unknown</Tag>;
  }
}

function getBreadcrumbItems(
  course,
  currentTopicIndex,
  currentPageIndex,
  setMain,
  setTopicIndex,
) {
  const items = [{ content: <HomeOutlined />, onClick: setMain }];
  if (currentTopicIndex != null) {
    items.push({
      content: course.topics[currentTopicIndex].name,
      onClick: () => setTopicIndex(currentTopicIndex),
    });
  }
  if (currentPageIndex != null) {
    items.push({
      content: course.topics[currentTopicIndex].children[currentPageIndex].name,
    });
  }
  return items;
}

function CourseEditorStatusBar({
  saveState,
  currentTopicIndex,
  currentPageIndex,
  course,
  setTopicIndex,
  setMain,
}) {
  const [breadcrumbItems, setBreadcrumbItems] = useState(null);
  useEffect(() => {
    if (course != null) {
      const items = getBreadcrumbItems(
        course,
        currentTopicIndex,
        currentPageIndex,
        setMain,
        setTopicIndex,
      );
      setBreadcrumbItems(items);
    }
  }, [currentTopicIndex, currentPageIndex, course, setMain]);

  return (
    <div
      css={[
        {
          height: `${statusBarHeight}px`,
          display: 'flex',
          justifyContent: 'space-between',
        },
        fixedHeaderCssAtHeight(mainHeaderHeight + pageHeaderHeight),
      ]}
    >
      {/* Breadcrumbs */}
      <div css={{ marginLeft: '1.5rem' }}>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      {/* Saving Status */}
      <div css={{ marginRight: '1.5rem' }}>{saveStateToTag(saveState)}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  saveState: state.saveState,
  currentTopicIndex: state.editCourse.currentTopicIndex,
  currentPageIndex: state.editCourse.currentPageIndex,
  course: state.editCourse.course,
});
const mapDispatchToProps = {
  setTopicIndex,
  setMain,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseEditorStatusBar);
