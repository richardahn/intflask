import React, { Component, useCallback, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import {
  AppBar,
  IconButton,
  Box,
  Link,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

// TODO: Do not allow drawer to be slideable on large screens

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  menuDrawerButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuItemButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const onLogoutClick = useCallback(
    (event) => {
      event.preventDefault();
      props.logoutUser(props.history);
    },
    [props.logoutUser, props.history],
  );

  const navbarItems = props.auth.isAuthenticated
    ? [
        {
          name: 'Home',
          to: '/',
        },
        {
          name: 'Profile',
          to: '/profile',
        },
        {
          name: 'My Courses',
          to: '/my-courses',
        },
        {
          name: 'Notebook',
          to: '/notebook',
        },
        {
          name: 'Admin',
          to: '/admin',
        },
        {
          name: 'Logout',
          to: '',
          onClick: onLogoutClick,
        },
      ]
    : [
        {
          name: 'Home',
          to: '/',
        },
        {
          name: 'Login',
          to: '/login',
        },
        {
          name: 'Signup',
          to: '/signup',
        },
      ];
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className={classes.root}>
        <AppBar position="fixed" color="primary" elevation={0}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuDrawerButton}
              color="inherit"
              aria-label="menu"
              size="small"
              onClick={() => setMenuDrawerOpen(true)}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link component={RouterLink} to="/" color="inherit">
                intflask
              </Link>
            </Typography>
            {navbarItems.map((item, index) => (
              <Button
                color="inherit"
                component={RouterLink}
                to={item.to}
                onClick={item.onClick}
                className={classes.menuItemButton}
                key={item.name}
              >
                {item.name}
              </Button>
            ))}
            <Box>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                Menu
              </Button>
              <Menu
                id="appbar-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>1</MenuItem>
                <MenuItem onClick={handleClose}>2</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={menuDrawerOpen}
          onClose={() => setMenuDrawerOpen(false)}
          onOpen={() => setMenuDrawerOpen(true)}
        >
          <Box
            className={classes.drawer}
            role="presentation"
            onClick={() => setMenuDrawerOpen(false)}
            onKeyDown={() => setMenuDrawerOpen(false)}
          >
            <List>
              {navbarItems.map((item, index) => (
                <ListItem
                  button
                  key={item.name}
                  component={RouterLink}
                  to={item.to}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </SwipeableDrawer>
      </Box>
      <Box style={{ height: '48px' }}></Box>
      {/* For some reason, the toolbar box to match the height of the AppBar isn't working correctly */}
      {/* <Box className={classes.toolbar} style={{ marginBottom: '10px' }} /> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
