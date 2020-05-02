const { request } = require('../utils/request');
const { User } = require('../db/models');

const create = async (req, res, next) => {
  try {
    let username = sessionStorage.getItem('user')
    const user = await User.findOne({ where: { username } });
    const options = {
      body: {
        resourceType: 'Patient',
        id: req.body.id,
        gender: req.body.gender,
      },
      bearerToken: user.accessBearerToken,
    };
    const response = await request('POST', 'fhir/dstu2', 'Patient', '', options);
    req.patient = response;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Patient creation was not successful' });
  }
};

const getEverything = async (req, res, next) => {
  try {
    let username = sessionStorage.getItem('user')
    const user = await User.findOne({ where: { username } });
    const options = {
      bearerToken: user.accessBearerToken,
    };
    const { patientId } = req;
    // const patientId = '4842f1a242fe';
    const qs = '$everything';

    const response = await request('GET', 'fhir/dstu2/Patient', patientId, qs, options);
    req.patient = response;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Patient creation was not successful' });
  }
};

module.exports = {
  create,
  getEverything,
};
