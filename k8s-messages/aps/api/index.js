const config = require('./src/config/config');
const app = require('./src/config/express');

const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });

console.logError = function (d) {
  log_file.write(util.format(d) + '\n');
};

if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on http://localhost:${config.port} (${config.env})`);
  });
}

module.exports = app;
