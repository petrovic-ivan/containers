const config = require('./src/config/config');
const app = require('./src/config/express');

if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on http://localhost:${config.port} (${config.env})`);
  });
}

module.exports = app;
