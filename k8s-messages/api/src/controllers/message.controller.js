const amqp = require('amqplib/callback_api');
const rabbit = 'amqp://0.0.0.0:5672';

async function publish(req, res) {
  if (!req.body.message) res.sendStatus(415);

  const data = '<' + new Date().toLocaleString() + '> ' + req.body.message;

  amqp.connect(rabbit, function (error0, connection) {
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

async function read(req, res) {
  amqp.connect(rabbit, function (error0, connection) {
    if (!error0) {
      connection.createChannel(function (error1, channel) {
        if (!error1) {
          const queue = 'node-app';
          channel.assertQueue(queue, {
            durable: false
          });
          channel.get(queue, {
            noAck: false
          }, function (err, msg) {
            if (msg) res.send(msg.content.toString());
          });
        }
      });
    }
  });

}

async function test(req, res) {
  res.send('Hello from message API.');
}

module.exports = {
  publish,
  read,
  test
}
