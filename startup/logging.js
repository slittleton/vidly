require('express-async-errors');
const winston = require('winston');
// require('winston-mongodb');

module.exports = function(){
  
process.on('uncaughtException', (ex)=>{
  console.log('WE GOT AN UNCAUGHT EXCEPTION');
  winston.error(ex.message, ex);
  process.exit(1);
})
// winston.handleException(new winston.transports.File({filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex)=>{
  console.log('WE GOT AN  Unhandled Rejection');
  winston.error(ex.message, ex);
  process.exit(1);
})


winston.add(winston.transports.File, {filename: 'logfile.log'}); 
// winston.add(winston.transports.MongoDb, { db: 'mongodb://localhost/vidly' })

}