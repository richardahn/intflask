import React, { useState, useCallback } from 'react';
import { Box } from '@material-ui/core';

// -- Components --
import IntflaskEditor from '../components/IntflaskEditor';
import DraftEditor from '../components/DraftEditor';
import { ContainerWithSidebar } from '../components/Sidebar';
import EditableCourseList from '../components/Sidebar/EditableCourseList';

function CourseMainEditable({ courseId, pageId }) {
  return (
    <Box>
      <DraftEditor />
    </Box>
  );
}

// TODO: Course in database has bool that indicates whether course is available for public
export default function EditCourse({ match }) {
  const { courseId, pageId } = match.params;
  const sidebarItems = {
    main: {
      link: `/course/${courseId}`,
    },
    tableOfContents: [
      {
        title: 'Topic 1',
        link: `/course/${courseId}/topic1`,
        children: [
          {
            title: 'Subtopic 1',
            link: `/course/${courseId}/subtopic1`,
          },
          {
            title: 'Subtopic 2',
            link: `/course/${courseId}/subtopic2`,
          },
        ],
      },
    ],
  };
  return (
    <Box display="flex">
      <ContainerWithSidebar
        sidebarChildren={<EditableCourseList items={sidebarItems} />}
      >
        <CourseMainEditable courseId={courseId} pageId={pageId} />
      </ContainerWithSidebar>
    </Box>
  );
}
