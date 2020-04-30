import { stringify } from 'querystring';

const request = '../utils/request.js';

const authenticate = async (req, res, cb) => {
  try {
    // assuming user exists, generate code for this user
    const response = await request('POST', 'user-management/v1', 'auth-code',
      stringify(
        {
          app_user_id: req.body.appUserId,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      ));
    // exchange code for access token
    const { code } = response;
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
    return cb();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export default authenticate;
