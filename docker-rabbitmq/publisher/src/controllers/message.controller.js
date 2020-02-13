const amqp = require('amqplib/callback_api');

async function publish(req, res) {
  if (!req.body.message) res.sendStatus(415);

  const data = '<' + new Date().toLocaleString() + '> ' + req.body.message;

  amqp.connect('amqp://rabbitmq:5672', function (error0, connection) {
    if (!error0) {
      connection.createChannel(function (error1, channel) {
        if (!error1) {
          const queue = 'node-app';
          const msg = data;

          channel.assertQueue(queue, {
            durable: false
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });


}


module.exports = {
  publish
}
