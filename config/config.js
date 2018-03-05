'use strict';

let config = {};

//quando servidor for pra producao ou hml trocar variavel abaixo para production
//quando servidor for local, usar development
config.environment = process.env.NODE_ENV || 'production';

// Preencher o BD com amostras, se for necessário
config.seedDB = false;

config.server = {
  host: process.env.IP || 'localhost'
};

// MongoDB configurações
if (config.environment === 'development') {
  config.server = {
    port: process.env.PORT || 3000
  };
  config.mongodb = {
    dbURI: 'mongodb://localhost:27017/avallie'         
  };  
} else if(config.environment === 'production'){
  config.server = {
    port: process.env.PORT || 3000
  };
  config.mongodb = {
    //informar a dbURI da umbler aqui
    dbURI: 'mongodb://mongo_avallie:27017'     
  };
} 

module.exports = config;
