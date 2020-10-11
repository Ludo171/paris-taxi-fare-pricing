require('dotenv').config();
const { startServer, stopServer } = require('./server');

startServer();

// setTimeout(() => {
//   stopServer();
// }, 60 * 5 * 1000);
