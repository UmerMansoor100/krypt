const http = require('http')
var cron = require('node-schedule')
require('dotenv').config()
var userDao = require('./dao/account_dao.js')
require('dotenv').config()
var FCM = require("fcm-push");
const PushServerKey = process.env.FCM_SERVER_KEY
var fcm = new FCM(PushServerKey);
var rule = new cron.RecurrenceRule()
rule.second = 1;

// Heartbeat Topic refresher
cron.scheduleJob('*/3 * * * *', async function() {
    var userDaoObject = new userDao()
    var getUserDetailsDao = await userDaoObject.getAllUserDetailsDao()
    if (getUserDetailsDao.result.length > 0) {
        getUserDetailsDao.result.forEach(async function(data, index) {
            // setTimeout(function() {
            var deviceToken = data.deviceToken
            var data = {
                "message": 'wake up ! ...'
            }
            var topic = 'heartbeat'
            var message = {
                to: '/topics/' + topic, // required fill with device token or topics
                collapse_key: 'your_collapse_key',
                data: {
                    title: 'cryp',
                    body: data,
                    sound: "default",
                    icon: "cryp",
                    your_custom_data_key: data,
                    type: 'topic_notification'
                },
                priority: 'high'
            };
            var res = {}
            fcm.send(message, function(err, response) {
                if (err) {
                    res.error = "true"
                    res.messages = err + " Something has gone wrong!"
                    console.log("Something has gone wrong!")
                    console.log(err)
                } else {
                    res.error = "false"
                    res.messages = "Successfully sent with response "
                    console.log("Successfully sent with response: ", response)
                }
            });
            // }, 5000);
        })
    } else {
        response.error = 'true'
        response.message = "user not registered"
        response.statusCode = 200
        console.log(response)
    }
})