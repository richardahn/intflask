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
  ButtonBase,
} from '@material-ui/core';
import { Link as RouterLink, Link } from 'react-router-dom';

// -- Icons --
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';

// Initial Setup
const headerHeight = 48;
const togglerWidth = 24;
const drawerWidth = 300;
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
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    visibility: 'visible',
  },
  fixedDrawer: {
    marginTop: (props) => props.topOffset,
    width: drawerWidth,
    overflowY: 'visible',
    height: (props) => `calc(100% - ${props.topOffset}px)`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: togglerWidth - drawerWidth,
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
}));

export function Sidebar({
  topOffset = headerHeight,
  open,
  onToggle,
  children,
}) {
  const classes = useStyles({ topOffset });
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
        <Button
          className={classes.drawerToggler}
          onClick={onToggle}
          disableRipple
          css={css`
            min-width: auto !important;
            border-radius: 0 !important;
          `}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
      </Drawer>
    </nav>
  );
}

export function ContainerWithSidebar({
  topOffset = headerHeight,
  children,
  sidebarChildren,
  ...props
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleSidebar = useCallback(() => setOpen(!open), [open]);
  return (
    <React.Fragment>
      <Sidebar open={open} onToggle={toggleSidebar} topOffset={topOffset}>
        {sidebarChildren}
      </Sidebar>
      <Container
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        {...props}
      >
        {children}
      </Container>
    </React.Fragment>
  );
}
