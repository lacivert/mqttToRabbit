var amqp = require('amqplib/callback_api');

module.exports = function (topic, msg) {

    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            var q = 'mtestr';

            var message = topic + ' - ' + msg;

            ch.assertQueue(q, {durable: false});
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(q, new Buffer(message));
            console.log(" [x] Sent :" + message);
        });

        setTimeout(function () {
            conn.close();
            // process.exit(0)
        }, 500);
    });

}
