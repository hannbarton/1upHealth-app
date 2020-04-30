const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('./index.js');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  accessBearerToken: {
    type: Sequelize.TEXT,
  },
  connectSystemId: {
    type: Sequelize.TEXT,
  },
});

