const amqp = require('amqplib/callback_api');

setTimeout(() => {

    amqp.connect('amqp://rabbitmq:5672', function (error0, connection) {
        if (error0) throw error0;

        connection.createChannel(function (error1, channel) {
            if (error1) throw error1;

            const queue = 'node-app';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Consumer waiting for messages in queue '%s'. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                console.log(" [x] %s", msg.content.toString());
            }, {
                noAck: true
            });
        });
    });

}, 10000);
