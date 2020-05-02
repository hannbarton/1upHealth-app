import React from 'react';
import CreatePatient from './CreatePatient';
import PatientList from './PatientList';

const HomePage = () => (
  <div className="main-container">
    <div className="login-signup-container">
      <CreatePatient />
      <PatientList />
    </div>
  </div>
);

export default HomePage;
