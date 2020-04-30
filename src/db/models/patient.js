const Sequelize = require('sequelize');
const db = require('./index.js');

const Patient = db.define('patient', {
  gender: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  patientId: {
    type: Sequelize.UUIDV4,
  },
  data: {
    type: Sequelize.JSONB,
  },
});

export default Patient;
