require('dotenv').config();

// code away!
const server = require('./server');
const defaults = require('./config/defaults');


server.listen(defaults.port, () => {
    console.log(`\n*** Server Running on http://localhost:${defaults.port} ***\n`);
  });
