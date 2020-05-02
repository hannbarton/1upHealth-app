import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Home from './components/Home';

class Routes extends React.Component {
	render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
