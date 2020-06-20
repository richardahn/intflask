// -- General --
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from './store/createAppStore';

// -- Components --
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';

// -- Pages --
import Landing from './pages/Landing';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Notebook from './pages/Notebook';
import CoursePreview from './pages/CoursePreview';
import MyCourses from './pages/MyCourses';
import Course from './pages/Course';
import Administrator from './pages/Administrator';
import EditCourse from './pages/EditCourse';

// -- Actions --
import {
  moveJwtFromCookiesToLocalStorage,
  authenticateJwtFromLocalStorage,
} from './actions/auth';
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core';

// -- Material UI --
import { createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack'; // Toasts

// These functions only get called when the App component refreshes, which will only happen when you refresh the page
const store = createAppStore();
store.dispatch(moveJwtFromCookiesToLocalStorage());
store.dispatch(authenticateJwtFromLocalStorage());

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#fff', // Warning: Notistack snackbar doesn't support 'white', so use '#fff'
      default: '#fff',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <CssBaseline />
            <Box className="App">
              <Box style={{ minHeight: '100vh' }}>
                <Header />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route
                    exact
                    path="/course-preview/:courseId"
                    component={CoursePreview}
                  />
                  <PrivateRoute
                    exact
                    path="/course/:courseId/:pageId?"
                    component={Course}
                  />
                  <NonAuthenticatedRoute
                    exact
                    path="/login"
                    component={Login}
                  />
                  <NonAuthenticatedRoute
                    exact
                    path="/signup"
                    component={Signup}
                  />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute exact path="/notebook" component={Notebook} />
                  <PrivateRoute
                    exact
                    path="/my-courses"
                    component={MyCourses}
                  />
                  <PrivateRoute exact path="/admin" component={Administrator} />
                  <PrivateRoute
                    exact
                    path="/edit-course/:courseId/:pageId?"
                    component={EditCourse}
                  />
                </Switch>
              </Box>
              <Footer />
            </Box>
          </Router>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}
