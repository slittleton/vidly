const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  // Connect to database
  const db = config.get('db');
  mongoose
    .connect(db )
    .then(() => winston.info(`Connected to ${db}...`))
};
