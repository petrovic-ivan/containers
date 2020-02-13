const amqp = require('amqplib/callback_api');

async function publish(req, res) {
  if (!req.body.message) res.send(415);

  const data = '<' + new Date().toLocaleString() + '> ' + req.body.message;

  amqp.connect('amqp://localhost:5672', function (error0, connection) {
    if (!error0) {
      connection.createChannel(function (error1, channel) {
        if (!error1) {
          const queue = 'node-app';
          const msg = data;

          channel.assertQueue(queue, {
            durable: false
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          res.send(200);
        }
      });

    } else {
      res.send(500);
    }

    setTimeout(function () {
      connection.close();
    }, 2000);
  });


}


module.exports = {
  publish
}
