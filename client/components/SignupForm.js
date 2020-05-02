/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class SignupForm extends React.Component {
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
    const { username, password } = this.state;
    event.preventDefault();
    const user = {
      username,
      password,
    };

    if (
      user.email === ''
      || user.password === ''
    ) {
      alert('please fill out every line on the form before submitting');
    } else {
      axios
        .post('/signup', user)
        .then((res) => {
          console.log(res);
          window.location = '/home';
        })
        .catch((err) => {
          alert(`and error occured, please try again with a unique username. ${err}`);
          window.location = '/';
        });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="sign-up">
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <h6>
            <span>Enter your personal details</span>
            <span>and create an account</span>
          </h6>
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
            placeholder="create password"
          />
          <br />
          <button id="sign-up-button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
