const amqp = require('amqplib/callback_api');

async function publish(req, res) {
  if (!req.body.message) res.send(415);

  const data = '<' + new Date().toLocaleDateString() + '> ' + req.body.message;

  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = 'node-app';
      const msg = data;

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });

  res.send(200);
}


module.exports = {
  publish
}
