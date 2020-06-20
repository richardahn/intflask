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
import { Link as RouterLink } from 'react-router-dom';

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

export function Sidebar({ open, onToggle, children }) {
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
          {children}
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

export function ContainerWithSidebar({ children, sidebarChildren, ...props }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleSidebar = useCallback(() => setOpen(!open), [open]);
  return (
    <React.Fragment>
      <Sidebar open={open} onToggle={toggleSidebar}>
        {sidebarChildren}
      </Sidebar>
      <Container
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </Container>
    </React.Fragment>
  );
}
