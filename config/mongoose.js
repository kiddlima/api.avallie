'use strict';

let logger   = require('mm-node-logger')(module);
let mongoose = require('mongoose');
let config   = require('./config');

function createMongooseConnection(cb) {
  // Cria a conexão do BD
  mongoose.Promise = global.Promise;

  // Faz a conexão com o mongo de acordo com a config
  mongoose.connect(config.mongodb.dbURI, {
    useMongoClient: true,
  });

  // Quando conseguir se connectar
  mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected to ' + config.mongodb.dbURI);
  });

  // Se a conexão der um erro
  mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error: ' + err);
  });

  // Quando não há conexão
  mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
  });

  // Quando a conexão está aberta
  mongoose.connection.once('open', function () {
    if(cb && typeof(cb) === 'function') {cb();}
  });

  // Se o Node encerrar, encerrar a conexão Mongoose
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      logger.info('Mongoose disconnected through app termination');
      mongoose.disconnect();
      process.exit(0);
    });
  });
}

module.exports = createMongooseConnection;