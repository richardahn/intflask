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
import Tutorials from './pages/Tutorials';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import TeacherSignup from './pages/TeacherSignup';
import TutorialDashboard from './pages/TutorialDashboard';

import EditorPlayground from './pages/EditorPlayground';

// -- Actions --
import {
  moveJwtFromCookiesToLocalStorage,
  authenticateJwtFromLocalStorage,
} from './actions/auth';
import TutorialPreview from './pages/TutorialPreview';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/tutorials" component={Tutorials} />
            <Route
              exact
              path="/tutorial-previews/:slug"
              component={TutorialPreview}
            />
            <NonAuthenticatedRoute exact path="/login" component={Login} />
            <NonAuthenticatedRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute
              exact
              path="/teacher-signup"
              component={TeacherSignup}
            />
            <PrivateRoute
              exact
              path="/tutorial-dashboard/:slug"
              component={TutorialDashboard}
            />
            <PrivateRoute exact path="/admin" component={Administrator} />
            <PrivateRoute
              exact
              path="/admin/edit-course/:slug"
              component={EditCourse}
            />
            <PrivateRoute
              exact
              path="/admin/create-course"
              component={CreateCourse}
            />

            <Route
              exact
              path="/editor-playground"
              component={EditorPlayground}
            />
          </Switch>
        </IntflaskLayout>
      </Router>
    </Provider>
  );
}
