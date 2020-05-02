import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import HomePage from './components/HomePage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginSignup} />
      <Route path="/home" component={HomePage} />
    </Switch>
  </BrowserRouter>
);


export default Routes;
