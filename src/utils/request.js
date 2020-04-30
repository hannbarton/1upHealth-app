const rp = require('request-promise');
const _ = require('lodash');


const request = (method, resource, options = {}) => {
  const uri = `${process.env.BASE_URL}/${resource}`;
  const headers = {
    Authorization: `Bearer ${process.env.ACCESS_BEARER_TOKEN}`,
  };

  const opts = _.merge({
    method,
    uri,
    json: true,
    headers,
  }, options);

  return rp(opts)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(`There was an error making the api request: ${err}`, method, uri, options);
    });
};

module.exports = request;
