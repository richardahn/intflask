// -- General --
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from './store/createAppStore';

// -- Components --
import PrivateRoute from './components/Routes/PrivateRoute';
import NonAuthenticatedRoute from './components/Routes/NonAuthenticatedRoute';
import IntflaskLayout from './components/IntflaskLayout';

// -- Pages --
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notebook from './pages/Notebook';
import CoursePreview from './pages/CoursePreview';
import MyCourses from './pages/MyCourses';
import Course from './pages/Course';
import Administrator from './pages/Administrator';
import EditCourse from './pages/EditCourse';
import TeacherSignup from './pages/TeacherSignup';
import CreateCourse from './pages/CreateCourse';

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
        <IntflaskLayout>
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
            <PrivateRoute exact path="/notebook" component={Notebook} />
            <PrivateRoute exact path="/my-courses" component={MyCourses} />
            <PrivateRoute exact path="/admin" component={Administrator} />
            <PrivateRoute
              exact
              path="/admin/edit-course/:courseId"
              component={EditCourse}
            />
            <PrivateRoute
              exact
              path="/admin/create-course"
              component={CreateCourse}
            />
          </Switch>
        </IntflaskLayout>
      </Router>
    </Provider>
  );
}
