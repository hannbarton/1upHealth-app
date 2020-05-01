const Sequelize = require('sequelize');
const db = require('../db');

const Patient = db.define('patient', {
  gender: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  patientId: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.JSONB,
  },
});

module.exports = Patient;
