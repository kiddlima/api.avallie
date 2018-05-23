'use strict';

let config = {};

//quando servidor for pra producao ou hml trocar variavel abaixo para production
//quando servidor for local, usar development
config.environment = process.env.NODE_ENV || 'homolog';

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
    dbURI: 'mongodb://avalliedb:4v4lli3db@naboo.mongodb.umbler.com:45197/avallie'
  };
} else if(config.environment === 'homolog'){
  config.server = {
    port: process.env.PORT || 3000
  };
  config.mongodb = {
    //informar a dbURI da umbler aqui 
    dbURI: 'mongodb://avalliedbhomolog:4v4lli3db@mustafar.mongodb.umbler.com:45820/avallie'
  };
}

module.exports = config;
