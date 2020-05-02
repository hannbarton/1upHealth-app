import React from 'react';
import LoginForm from './LoginForm';

class LoginSignup extends React.Component {
  render() {
      return (
          <div className='main-container'>
            <div className='login-signup-container'>
                <LoginForm/>
            </div>
          </div>
      )
  }
}

export default LoginSignup;
