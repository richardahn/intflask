import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, CardActionArea, CardMedia, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'center',
    minHeight: '300px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
        <Link
          component={RouterLink}
          to={course.link}
          style={{ textDecoration: 'none' }}
        >
          <CardMedia
            image={course.image}
            title="Random"
            style={{ height: '200px' }}
          />
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              style={{ color: 'white' }}
            >
              {course.title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <Box display="flex" justifyContent="flex-end">
        <CardActions>
          <Button size="small" style={{ color: 'white' }}>
            Buy $5
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
