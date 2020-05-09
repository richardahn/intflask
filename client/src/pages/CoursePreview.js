import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
  Button,
} from '@material-ui/core';
import { useParams, Link as RouterLink } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  nest1: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function Course() {
  const classes = useStyles();
  let { courseId } = useParams();
  const [tab, setTab] = useState(0);
  const onTabChange = useCallback((event, newValue) => setTab(newValue));
  return (
    <>
      <Container style={{ height: '40vh', padding: 0, maxWidth: 'none' }}>
        <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box style={{ overflow: 'hidden', height: '100%' }}>
            <img
              src="https://i.picsum.photos/id/444/1000/1000.jpg"
              style={{ width: '100%' }}
            />
          </Box>
          <Box
            style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <Box>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to={`/course/${courseId}`}
                style={{ marginBottom: '10px', marginRight: '10px' }}
              >
                Go to Course
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Divider />
      <Container style={{ height: '60vh', padding: '0', maxWidth: 'none' }}>
        <Box>
          <Tabs value={tab} onChange={onTabChange} indicatorColor="primary">
            <Tab label="Description" />
            <Tab label="Outline" />
          </Tabs>
        </Box>
        <Box px={3} py={1}>
          <TabPanel value={tab} index={0}>
            <Typography>Short description of the course.</Typography>
            <Typography>Requirements</Typography>
            <ul>
              <li>Requirement 1</li>
              <li>Requirement 2</li>
            </ul>
            <Typography>Objectives</Typography>
            <ul>
              <li>Objective 1</li>
              <li>Objective 2</li>
            </ul>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItem button>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography style={{ fontWeight: 'bold' }}>
                      Topic One
                    </Typography>
                  }
                />
              </ListItem>
              <List component="div" disablePadding>
                <ListItem button className={classes.nest1}>
                  <ListItemText primary="Subtopic One" />
                </ListItem>
                <ListItem button className={classes.nest1}>
                  <ListItemText primary="Subtopic Two" />
                </ListItem>
              </List>
              <ListItem button>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography style={{ fontWeight: 'bold' }}>
                      Topic Two
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography style={{ fontWeight: 'bold' }}>
                      Topic Three
                    </Typography>
                  }
                />
              </ListItem>
              <List component="div" disablePadding>
                <ListItem button className={classes.nest1}>
                  <ListItemText primary="Subtopic One" />
                </ListItem>
              </List>
            </List>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
