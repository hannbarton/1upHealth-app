/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      accessBearerToken: '',
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
    };

    const defaultUser = {};

    if (user.username === '') {
      alert('please enter a username');
    } else {
      axios.post('/api/login', user || defaultUser)
        .then((res) => {
          this.state.accessBearerToken = res.accessBearerToken
          console.log(res.data);
          window.location = '/home';
        }).catch((err) => {
          alert(`Oops something went wrong ${err}`);
          window.location = '/';
        });
    }
  }

  render() {
    const { username } = this.state;
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
