const config = require('../config2.js')
const cradle = require('cradle');
cradle.setup(config);

const couch = new(cradle.Connection)().database('amazon-products');

module.exports.couch = couch;

//For pull request ^^



