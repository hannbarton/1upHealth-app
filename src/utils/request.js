const rp = require('request-promise');
const _ = require('lodash');

module.exports = {

  /**
   * Generic request method that will make api requests for you
   * @param {*} method - GET/POST/PUT/DELETE
   * @param {*} resource - Patient
   * @param {*} path - PatientId
   * @param {*} qs - `$everything`
   * @param {*} options - additonal options
   */
  async request(method, resource, path, qs, options = {}) {
    let url = `${process.env.BASE_URL}/${resource}`;
    const headers = {};
    let body = {};

    if (path.length) {
      url += `/${path}`;
    }

    if (options.bearerToken) {
      headers.Authorization = `Bearer ${options.bearerToken}`;
    }

    if (options.body) {
      body = options.body;
    }

    if (qs.length) {
      url += `?${qs}`;
    }

    const opts = _.merge({
      method,
      uri: url,
      resolveWithFullResponse: true,
      body,
      json: true,
      headers,
    }, options);

    return rp(opts)
      .then((response) => response.body)
      .catch((err) => {
        console.log('REQUEST ERROR', method, url, err.response);
        throw err;
      });
  },
};
