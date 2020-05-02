const { stringify } = require('querystring');
const { request } = require('../utils/request');

const authenticate = async (req, res, next) => {
  try {
    // assuming user exists, generate access-code for this user
    const response = await request('POST', 'user-management/v1/user', 'auth-code',
      stringify(
        {
          app_user_id: req.body.username,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      ));
    // exchange access-code for access token
    const { code } = response;
    const { access_token: accessBearerToken } = await request('POST', 'fhir/oauth2', 'token',
      stringify(
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
        },
      ));
    req.accessBearerToken = accessBearerToken;
    req.username = req.body.username;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Authentication was not successful' });
  }
};

module.exports = authenticate;
