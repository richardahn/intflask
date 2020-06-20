// -- General --
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from './store/createAppStore';

// -- Components --
import PrivateRoute from './components/Routes/PrivateRoute';
import NonAuthenticatedRoute from './components/Routes/NonAuthenticatedRoute';
import Layout from './components/Layout';

// -- Pages --
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Notebook from './pages/Notebook';
import CoursePreview from './pages/CoursePreview';
import MyCourses from './pages/MyCourses';
import Course from './pages/Course';
import Administrator from './pages/Administrator';
import EditCourse from './pages/EditCourse';
import TeacherSignup from './pages/TeacherSignup';

// -- Actions --
import {
  moveJwtFromCookiesToLocalStorage,
  authenticateJwtFromLocalStorage,
} from './actions/auth';

// Setup store
const store = createAppStore();
store.dispatch(moveJwtFromCookiesToLocalStorage());
store.dispatch(authenticateJwtFromLocalStorage());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
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
            <NonAuthenticatedRoute exact path="/login" component={Login} />
            <NonAuthenticatedRoute exact path="/signup" component={Signup} />
            <PrivateRoute
              exact
              path="/teacher-signup"
              component={TeacherSignup}
            />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/notebook" component={Notebook} />
            <PrivateRoute exact path="/my-courses" component={MyCourses} />
            <PrivateRoute exact path="/admin" component={Administrator} />
            <PrivateRoute
              exact
              path="/edit-course/:courseId/:pageId?"
              component={EditCourse}
            />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}
