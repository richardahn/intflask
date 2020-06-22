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
import Administrator from './pages/Administrator';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
        <IntflaskLayout>
          <Switch>
            <Route exact path="/" component={Landing} />
            <NonAuthenticatedRoute exact path="/login" component={Login} />
            <NonAuthenticatedRoute exact path="/signup" component={Signup} />
            <PrivateRoute
              exact
              path="/teacher-signup"
              component={TeacherSignup}
            />
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
