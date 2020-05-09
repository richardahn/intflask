import React from 'react';
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
import { Container, Box } from '@material-ui/core';
import CoursePreviewCard from '../components/CoursePreviewCard';

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
  return (
    <Box display="flex" mt={3} px={3}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {courses.map((course) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={course.title}>
                <CoursePreviewCard course={course} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Landing;
