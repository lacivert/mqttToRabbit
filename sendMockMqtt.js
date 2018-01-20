var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var cron = require('cron');

client.on('connect', function () {
  client.subscribe('mtest')
});

var job1 = new cron.CronJob({
    cronTime: '* * * * * *',
    onTick: function() {
        var msg = 'One tick per sec: ' + new Date();
        console.log('msg sending: ' + msg);
        client.publish('mtest', msg);
    },
    start: true
});