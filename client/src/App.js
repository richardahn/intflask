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
import CreateTutorial from './pages/CreateTutorial';
import EditTutorial from './pages/EditTutorial';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TutorialDashboard from './pages/TutorialDashboard';
import TutorialPreview from './pages/TutorialPreview';
import Purchases from './pages/Purchases';
import ViewTutorial from './pages/ViewTutorial';

// -- Actions --
import {
  moveJwtFromCookiesToLocalStorage,
  authenticateJwtFromStorage,
} from './actions/auth';
import PurchaseTutorial from './pages/PurchaseTutorial';

// Setup store
const store = createAppStore();
store.dispatch(moveJwtFromCookiesToLocalStorage());
store.dispatch(authenticateJwtFromStorage());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <IntflaskLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tutorials/:query?" component={Tutorials} />
            <Route
              exact
              path="/tutorial-preview/:slug"
              component={TutorialPreview}
            />
            <NonAuthenticatedRoute exact path="/login" component={Login} />
            <NonAuthenticatedRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/purchases" component={Purchases} />
            <PrivateRoute
              exact
              path="/purchase-tutorial/:slug"
              component={PurchaseTutorial}
            />
            <PrivateRoute
              exact
              path="/admin/tutorial-dashboard/:slug"
              component={TutorialDashboard}
            />
            <PrivateRoute exact path="/admin" component={Administrator} />
            <PrivateRoute
              exact
              path="/admin/edit-tutorial/:slug"
              component={EditTutorial}
            />
            <PrivateRoute
              exact
              path="/view-tutorial/:slug"
              component={ViewTutorial}
            />
            <PrivateRoute
              exact
              path="/admin/create-tutorial"
              component={CreateTutorial}
            />
          </Switch>
        </IntflaskLayout>
      </Router>
    </Provider>
  );
}
