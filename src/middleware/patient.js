const { request } = require('../utils/request');

const create = async (req, res, next) => {
  try {
    const options = {
      body: {
        resourceType: 'Patient',
        id: '134958575',
        gender: 'female',
      },
      bearerToken: req.accessToken,
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
    const options = {
      bearerToken: req.accessToken,
    };
    const { patientId } = req;
    const qs = '$everything';

    const response = await request('POST', 'fhir/dstu2/Patient', patientId, qs, options);
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
