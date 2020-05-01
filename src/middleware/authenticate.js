const { stringify } = require('querystring');

const { request } = require('../utils/request');

const authenticate = async (req, res, next) => {
  try {
    // assuming user exists, generate access-code for this user

    const response = await request('POST', 'user-management/v1/user', 'auth-code',
      stringify(
        {
          app_user_id: 'hannbarton',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      ));
    // exchange access-code for access token
    const { code } = response;
    console.log('next step', code);
    const { access_token: accessToken } = await request('POST', 'fhir/oauth', 'token',
      stringify(
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
        },
      ));
    // save access token in the database
    console.log(accessToken);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Authentication was not successful' });
  }
};

module.exports = authenticate;
