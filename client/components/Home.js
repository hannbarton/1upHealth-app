/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      gender: ""
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
      id: this.state.id,
      gender: this.state.gender,
    };

    const defaultUser = {
    };

    if (user.id === '' || user.gender === '') {
      alert('please enter a name and gender');
    } else {
      axios.post('/api/create', user || defaultUser)
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          alert(`Oops something went wrong ${err}`);
          window.location = '/home';
        });
    }
  }

  render() {
    const { id, gender } = this.state;
    return (
      <div className="login">
        <h2>Create Patient</h2>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="id"
            onChange={this.handleChange}
            value={id}
            placeholder="enter identifier like name or uuid"
          />
          <br />
          <input
            type="text"
            name="gender"
            onChange={this.handleChange}
            value={gender}
            placeholder="enter gender"
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

export default Home;
