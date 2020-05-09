import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';

export default function CourseMain({ courseId, pageId }) {
  return (
    <Box>
      <Typography variant="h6">{pageId ?? 'Main'}</Typography>
      <Typography paragraph>Course ID: {courseId}</Typography>
      <Typography paragraph>Page ID: {pageId}</Typography>
    </Box>
  );
}
