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
    type: Sequelize.STRING,
  },
  connectSystemId: {
    type: Sequelize.STRING,
  },
});

User.prototype.correctPassword = function (userPwd) {
  return User.encryptPassword(userPwd, this.salt()) === this.password();
};

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = (user) => {
  const usr = user;
  if (usr.changed('password')) {
    usr.salt = User.generateSalt();
    usr.password = User.encryptPassword(user.password(), user.salt());
  }
  return usr;
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
