/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class CreatePatient extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      gender: '',
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

    const username = localStorage.getItem('user');

    const { id, gender } = this.state;
    const user = {
      id,
      gender,
      username,
    };

    const defaultUser = {};

    if (user.id === '' || user.gender === '') {
      alert('please enter a name and gender');
    } else {
      axios.post('/api/create', user || defaultUser)
        .then((res) => {
          if (res) alert('patient successfully created');
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
        <h6>Create at least 1 Patient</h6>
        <h6>Next, retrieve patient data using patient ID</h6>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="id"
            onChange={this.handleChange}
            value={id}
            placeholder="Enter identifier like name or id. This is the patient ID"
          />
          <br />
          <input
            type="text"
            name="gender"
            onChange={this.handleChange}
            value={gender}
            placeholder="Enter Gender"
          />
          <br />
          <button
            type="submit"
            id="login-button"
          >
            Create
          </button>
        </form>
      </div>

    );
  }
}

export default CreatePatient;
