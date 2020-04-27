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
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
      <Container style={{ height: '40vh', padding: 0 }} maxWidth="false">
        Carousel Here
      </Container>
      <Divider />
      <Container style={{ height: '60vh', padding: '0' }} maxWidth="false">
        <Tabs value={tab} onChange={onTabChange} indicatorColor="primary">
          <Tab label="Description" />
          <Tab label="Outline" />
        </Tabs>
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
