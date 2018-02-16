let mongoose = require('./config/mongoose');
let logger  = require('mm-node-logger')(module);
let config  = require('./config/config');
let express = require('./config/express');

mongoose(() => {
  let app = express.init();
  app.listen(config.server.port, () => {
    logger.info('Server is running!');
  });
});