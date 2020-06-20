// -- General --
import React, { Component, useCallback } from 'react';
import { Box, Typography, Divider } from '@material-ui/core';

// -- Components --
import { ContainerWithSidebar } from '../components/Sidebar';
import CourseList from '../components/Sidebar/CourseList';

function CourseMain({ courseId, pageId }) {
  return (
    <Box>
      <Typography variant="h6">{pageId ?? 'Main'}</Typography>
      <Typography paragraph>Course ID: {courseId}</Typography>
      <Typography paragraph>Page ID: {pageId}</Typography>
    </Box>
  );
}

export default function Course({ match }) {
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
        sidebarChildren={<CourseList items={sidebarItems} />}
      >
        <CourseMain courseId={courseId} pageId={pageId} />
      </ContainerWithSidebar>
    </Box>
  );
}
