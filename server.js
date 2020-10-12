const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pricingRoute = require('./routes/pricing');

const setExpressApp = () => {
  const app = express();

  // Cors
  // Set up a whitelist and check against it:
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ?
      process.env.FRONT_END_URL_PROD : process.env.FRONT_END_URL_DEV
  };
  // Then pass them to cors:
  app.use(cors(corsOptions));


  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  app.use('/pricing', pricingRoute);
  return app;
};
const expressApp = setExpressApp();


let server = null;
const startServer = async () => {
  const PORT = process.env.PORT || 8080;
  server = expressApp.listen(PORT);
  console.log(`[Express] Server started ! Listening port ${PORT}...`);
  return;
};

const stopServer = () => {
  server.close();
  console.log('[Express] Server Stopped.');
};

module.exports = { server, startServer, stopServer };

