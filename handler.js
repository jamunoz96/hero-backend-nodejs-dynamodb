'use strict';

const app = require('./build/app');
const sls = require('serverless-http');

module.exports.api = sls(app);
