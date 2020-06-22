/** @jsx jsx */
import React, { useState, useCallback } from 'react';
import { css, jsx } from '@emotion/core';
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
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

// -- Icons --
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
export default function CourseList({ items }) {
  const classes = useStyles();
  return (
    <List>
      <ListItem button component={RouterLink} to={items.main.link}>
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
            component={RouterLink}
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
                  component={RouterLink}
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
  );
}
