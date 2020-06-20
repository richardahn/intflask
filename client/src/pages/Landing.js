import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Box, Tabs, Tab, AppBar } from '@material-ui/core';
import CoursePreviewCard from '../components/CoursePreviewCard';
import { ContainerWithSidebar } from '../components/Sidebar';

class Course {
  constructor(title, link, image) {
    this.title = title;
    this.link = link;
    this.image = image;
  }
}

function Landing(props) {
  const courses = [
    new Course(
      'Course 1',
      '/course-preview/building-this-website',
      'https://picsum.photos/600',
    ),
    new Course(
      'Course 2',
      '/course-preview/building-this-website',
      'https://picsum.photos/500',
    ),
  ];
  const [tab, setTab] = useState(0);
  const onTabChange = useCallback((_, value) => setTab(value), []);
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        style={{ marginTop: '48px', zIndex: 1500 }}
        elevation="1"
      >
        <Tabs
          value={tab}
          onChange={onTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="App Tutorials" />
          <Tab label="Courses" />
        </Tabs>
      </AppBar>
      <Box style={{ height: '48px' }}></Box>
      <Box display="flex">
        <ContainerWithSidebar maxWidth="xl" px={3} topOffset={96}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              Hello
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              Search bar
            </Grid>
            {courses.map((course) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  key={course.title}
                >
                  <CoursePreviewCard course={course} />
                </Grid>
              );
            })}
          </Grid>
        </ContainerWithSidebar>
      </Box>
    </>
  );
}

export default Landing;
