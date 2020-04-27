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
  constructor(title, link) {
    this.title = title;
    this.link = link;
  }
}

function Landing(props) {
  const courses = [
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
    new Course('Building this Website', '/course/building-this-website'),
  ];
  return (
    <Box display="flex" mt={3} px={3}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {courses.map((course) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
