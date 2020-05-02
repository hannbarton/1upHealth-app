/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';

class PatientList extends React.Component {
  constructor() {
    super();
    this.state = {
      patientId: '',
      patientData: 'no patients yet',
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

    const { patientId } = this.state;
    const user = {
      patientId,
      username,
    };

    const defaultUser = {};

    if (!user.patientId) {
      // es
      alert('please enter patient identifier');
    } else {
      axios.post('/api/everything', user || defaultUser)
        .then((res) => {
          const data = JSON.stringify(res.data.patient, null, '\n');
          this.setState({ patientData: data });
        }).catch((err) => {
          alert(`Oops something went wrong; this patient might not exist ${err}`);
        });
    }
  }

  render() {
    const { patientId, patientData } = this.state;
    return (
      <div className="main-container">
        <div className="login-signup-container">
          <h3>Get Patient Data according to Patient ID</h3>
          <form id="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="patientId"
              onChange={this.handleChange}
              value={patientId}
              placeholder="Enter patient ID"
            />
            <br />
            <button
              type="submit"
              id="login-button"
            >
              get data
            </button>
          </form>
          <div className="article-container">
            {patientData}
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default PatientList;
