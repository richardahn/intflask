import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, CardActionArea, CardMedia } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '300px',
  },
  title: {
    fontSize: 14,
  },
}));

export default function CoursePreviewCard({ course, ...props }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea>
        <Link component={RouterLink} to={course.link}>
          <CardMedia
            image="https://picsum.photos/600"
            title="Random"
            style={{ height: '200px' }}
          />
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {course.title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
