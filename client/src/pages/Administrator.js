import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@material-ui/core';

export default function Administrator() {
  return (
    <Container>
      <Box pt={2}>
        <Typography>Created Courses</Typography>
        <Typography>Course Drafts</Typography>
        <Button component={RouterLink} to="/edit-course/123">
          Create a Course
        </Button>
      </Box>
    </Container>
  );
}
