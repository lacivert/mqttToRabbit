var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var cron = require('cron');
var send = require('./send.js');

client.on('connect', function () {
  client.subscribe('mtest')
});

client.on('message', function (topic, message) {
  // message is Buffer  
  console.log('new message:', message.toString())
  console.log('topic', topic)
  // client.end()
    send(topic, message.toString());
});

