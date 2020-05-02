const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  accessBearerToken: {
    type: Sequelize.STRING,
  },
  connectSystemId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
