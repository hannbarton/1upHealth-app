const User = require('./user');
const Patient = require('./patient');

Patient.belongsTo(User);
User.hasMany(Patient);

module.exports = {
  User,
  Patient,
};
