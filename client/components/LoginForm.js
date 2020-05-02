import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

    const { username } = this.state;
    const user = {
      username,
    };

    const defaultUser = {};

    if (user.username === '') {
      alert('please enter a username');
    } else {
      axios.post('/api/login', user || defaultUser)
        .then((res) => {
          localStorage.setItem('user', res.data.username);
          window.location = `https://quick.1up.health/connect/4706?access_token=${res.data.accessBearerToken}`;
        })
        .catch((err) => {
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
