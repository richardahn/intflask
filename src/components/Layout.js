import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Welcome from '../pages/Welcome';

export default function Layout() {
  const routes = [
    { path: '/', exact: true, component: Welcome },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
  ];
  
  return (
    <Router>
      <Switch>
        {routes.map(route => <Route {...route} />)}
      </Switch>
    </Router>
  )
}