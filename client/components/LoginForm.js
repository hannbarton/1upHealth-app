import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { setMainUser } from '../reducer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      accessBearerToken: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { username } = this.state;
    console.log(username);
    setMainUser(username);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, accessBearerToken } = this.state;
    const user = {
      username,
    };

    const defaultUser = {};

    if (user.username === '') {
      alert('please enter a username');
    } else {
      axios.post('/api/login', user || defaultUser)
        .then((res) => {
          this.setState({
            accessBearerToken: res.data.accessBearerToken,
            username: res.data.username,
          });
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

const mapState = (state) => ({
  user: state.username,
});

const mapDispatch = (dispatch) => ({
  setMainUser: (user) => dispatch(setMainUser(user)),
});

export default withRouter(
  connect(
    mapState,
    mapDispatch,
  )(LoginForm),
);
