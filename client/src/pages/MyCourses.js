import React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function MyCourses() {
  const courses = [
    {
      title: 'Course 1',
      courseId: 'building-this-website',
    },
    {
      title: 'Course 2',
      courseId: 'building-this-website',
    },
  ];
  return (
    <Container>
      <Box pt={2}>
        <Typography variant="h6">My Courses</Typography>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {courses.map((course) => (
            <ListItem
              button
              component={Link}
              to={`/course/${course.courseId}`}
              key={course.title}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{ fontWeight: 'bold' }}>
                    {course.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
