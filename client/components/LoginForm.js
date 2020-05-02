/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    const defaultUser = {};

    if (user.email === '' || user.password === '') {
      alert('please enter both username and password to login');
    } else {
      axios.post('/api/users/login', user || defaultUser)
        .then((res) => {
          console.log(res.data);
          window.location = '/home';
        }).catch((err) => {
          alert(`incorrect username or password: ${err}`);
          window.location = '/';
        });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <h2>Sign in</h2>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={username}
            placeholder="enter your username"
          />
          <br />
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
            value={password}
            placeholder="enter password"
          />
          <br />
          <button
            type="submit"
            id="login-button"
          >
            Login
          </button>
        </form>
      </div>

    );
  }
}

export default LoginForm;
