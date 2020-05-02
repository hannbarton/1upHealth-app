import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';

class Routes extends React.Component {
	render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginSignup} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
