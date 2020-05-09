/** @jsx jsx */

// -- General --
import { css, jsx } from '@emotion/core';
import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  Tabs,
  Container,
  Divider,
  Typography,
  Box,
  Drawer,
  Hidden,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  ListItemIcon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// -- Components --
import CourseMain from '../components/course/CourseMain';

// -- Icons --
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';

// Initial Setup
const headerHeight = 48;
const togglerWidth = 24;
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('xs')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerToggler: {
    position: 'absolute',
    right: -togglerWidth,
    width: togglerWidth,
    height: `calc(100% - ${headerHeight}px)`,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    visibility: 'visible',
  },
  fixedDrawer: {
    marginTop: headerHeight,
    width: drawerWidth,
    overflowY: 'visible',
    height: `calc(100% - ${headerHeight}px)`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: togglerWidth,
  },
  nestedSidebarItem: {
    paddingLeft: theme.spacing(4),
  },
  sidebar: {
    minHeight: '101%',
  },
}));

function CourseSidebar({ items, open, onToggle, courseId }) {
  const classes = useStyles();
  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.fixedDrawer }}
      >
        <Box
          style={{
            overflowY: 'overlay',
            overscrollBehavior: 'contain',
          }}
          css={css`
            ::-webkit-scrollbar {
              -webkit-appearance: none;
              width: 6px;
            }
            ::-webkit-scrollbar-track {
              background: none;
              border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb {
              background: lightgray;
              border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: gray;
            }
          `}
        >
          <List>
            <ListItem button component={Link} to={items.main.link}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Main" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Table of Contents" />
            </ListItem>
            {items.tableOfContents.map((item, index) => (
              <React.Fragment>
                <ListItem
                  button
                  key={item.text}
                  component={Link}
                  to={item.link}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
                {item.children != null && (
                  <List component="div" disablePadding>
                    {item.children.map((subitem, index) => (
                      <ListItem
                        button
                        key={subitem.title}
                        className={classes.nestedSidebarItem}
                        component={Link}
                        to={subitem.link}
                      >
                        <ListItemText primary={subitem.title}></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box className={classes.drawerToggler}>
          <IconButton
            component="span"
            style={{ width: '15px', height: '15px' }}
            onClick={onToggle}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Drawer>
    </nav>
  );
}
export default function Course({ match }) {
  // Fill up course based on match.params.courseId and match.params.pageId
  const { courseId, pageId } = match.params;
  const classes = useStyles();
  const sidebarItems = {
    main: {
      link: `/course/${courseId}`,
    },
    tableOfContents: [
      {
        title: 'Topic 1',
        link: `/course/${courseId}/topic1`,
        children: [
          {
            title: 'Subtopic 1',
            link: `/course/${courseId}/subtopic1`,
          },
          {
            title: 'Subtopic 2',
            link: `/course/${courseId}/subtopic2`,
          },
        ],
      },
    ],
  };
  const [open, setOpen] = React.useState(true);
  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <React.Fragment>
      <Box display="flex">
        <CourseSidebar
          items={sidebarItems}
          open={open}
          onToggle={toggleSidebar}
        />
        <Container
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <CourseMain courseId={courseId} pageId={pageId} />
        </Container>
      </Box>
    </React.Fragment>
  );
}
