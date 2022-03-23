 module.exports = function() {
     var crypto = require("crypto")
     var jwt = require('jsonwebtoken')
     const nodemailer = require('nodemailer')
     require('dotenv').config()
     var FCM = require("fcm-push");
     const PushServerKey = process.env.FCM_SERVER_KEY
     var fcm = new FCM(PushServerKey);
     var fs = require('fs');
     var path = require('path');
     var apn = require('apn');
     // var options = {
     //     token: {
     //         key: path.join(__dirname, '../cert/AuthKey_3NA573XP2A.p8'),
     //         keyId: "3NA573XP2A",
     //         teamId: "S443768MW7"
     //     },
     //     production: false
     // };
     // let service = new apn.Provider(options);

     // let service = new apn.Provider({
     //     cert: "/root/cert/VOIPPatientCertificates.pem",
     //     key: "/root/cert/VOIPPatientKey.pem"
     // });


     this.getMonthDayFromCurrentDate = function(userDetails, userData) {
         return new Promise(function(resolve) {
             var currentMonth = new Date().getMonth()
             var arr1 = [1, 2, 3];
             var arr2 = [4, 5, 6];
             var arr3 = [7, 8, 9];
             var arr4 = [10, 11, 12];
             var monthSet1 = (arr1.indexOf(currentMonth + 1) > -1);
             if (monthSet1) {
                 userDetails.graphMonths = ['Jan', 'Feb', 'Mar']
                 userData.appointmentMonths = arr1
             }
             var monthSet2 = (arr2.indexOf(currentMonth + 1) > -1);
             if (monthSet2) {
                 userDetails.graphMonths = ['Apr', 'May', 'Jun']
                 userData.appointmentMonths = arr2
             }
             var monthSet3 = (arr3.indexOf(currentMonth + 1) > -1);
             if (monthSet3) {
                 userDetails.graphMonths = ['Jul', 'Aug', 'Sep']
                 userData.appointmentMonths = arr3
             }
             var monthSet4 = (arr4.indexOf(currentMonth + 1) > -1);
             if (monthSet4) {
                 userDetails.graphMonths = ['Oct', 'Nov', 'Dec']
                 userData.appointmentMonths = arr4
             }
             resolve(userDetails, userData)
         })
     }

     this.time = function() { //get current time
         return new Promise(function(resolve) {
             var data = {}
             var now = new Date();
             var year = "" + now.getFullYear();
             var month = "" + (now.getMonth() + 1);
             if (month.length == 1) { month = "0" + month; }
             var day = "" + now.getDate();
             if (day.length == 1) { day = "0" + day; }
             var hour = "" + now.getHours();
             if (hour.length == 1) { hour = "0" + hour; }
             var minute = "" + now.getMinutes();
             if (minute.length == 1) { minute = "0" + minute; }
             var second = "" + now.getSeconds();
             if (second.length == 1) { second = "0" + second; }
             data.date = year + "-" + month + "-" + day;
             data.time = hour + ":" + minute + ":" + second;
             // console.log("time data", data)
             resolve(data)
         })
     }


     this.random = function(length) {
         // set the length of the string
         var stringLength = length;
         // list containing characters for the random string
         var stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
         var rndString = "";
         // build a string with random characters
         for (var i = 0; i < stringLength; i++) {
             var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
             rndString = rndString + stringArray[rndNum];
         };
         return rndString;
     }

     this.randomOTP = function() {
         var otp = Math.floor(Math.random() * 900000) + 100000;
         return otp;
     }

     this.singleVoipCall = function(tokens, payloadData) {
         topic = 'com.app.cryp'
         console.log('tokens', tokens)
         console.log('topic', topic)
         return new Promise(function(resolve) {
             var messages = {}
             let note = new apn.Notification({
                 alert: "Breaking News: I just sent my first Push Notification",
                 title: "title",
                 // topic: topic,
                 body: "body",
                 payload: payloadData,
                 pushType: 'alert'
             });
             console.log(note)
             service.send(note, tokens).then(result => {
                 if (result.sent.length > 0) {
                     messages.error = "false"
                     messages.messages = "Successfully sent with response: " + result
                     console.log("Successfully sent with response: ", result)
                 } else {
                     messages.error = "true"
                     messages.messages = "Something has gone wrong!"
                     console.log("Something has gone wrong!")
                     console.log(result)
                 }
                 resolve(messages)

             });
         })
     }

     this.sendSingleNotification = function(pushNotificationId, data) {
         return new Promise(function(resolve) {
             var message = {
                 to: pushNotificationId, // required fill with device token or topics
                 priority: 'high',
                 "data": {
                     "title": 'cryp',
                     "body": data,
                     "sound": "default",
                     "icon": "cryp",
                     "mutable_content": true,
                     "your_custom_data_key": data,
                     "type": 'call_notification'
                 }
             };
             sendPush(message, function(response) {
                 resolve(response)
             });

         })
     }

     this.sendSingleNotificationWithTopic = function(topic, data) {
         return new Promise(function(resolve) {
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
             sendPush(message, function(response) {
                 resolve(response)
             });

         })
     }

     this.sendSingleChatNotification = function(pushNotificationId, data) {
         return new Promise(function(resolve) {
             var message = {
                 to: pushNotificationId, // required fill with device token or topics
                 collapse_key: 'your_collapse_key',
                 priority: 'high'
             };
             if (data.os == 'android') {
                 message.data = {
                     title: 'cryp',
                     body: data,
                     sound: "default",
                     icon: "cryp",
                     your_custom_data_key: data,
                     type: 'chat_notification'
                 }
             } else {
                 message.notification = {
                     title: 'cryp',
                     body: "You Have a message from " + data.name,
                     doctorsName: data.name,
                     doctorsImage: data.image,
                     senderID: data.senderID,
                     sound: "default",
                     icon: "cryp",
                     type: 'chat_notification'
                 }
             }
             sendPush(message, function(response) {
                 resolve(response)
             });

         })
     }

     this.generatePasswordHashAdmin = function(password) {
         return new Promise(function(resolve) {
             var hpassword = crypto.createHash('sha256').update(password).digest('base64');
             resolve(hpassword)
         })
     }

     this.generatePasswordHash = function(password) {
         // return new Promise(function(resolve) {
         let salt = crypto.randomBytes(16).toString('base64');
         let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
         var hpassword = salt + "$" + hash;
         return (hpassword)
         // })
     }

     this.reGeneratePasswordHash = function(password, salt) {
         // return new Promise(function(resolve) {
         let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
         return (hash)
         // })
     }

     this.spiltPasswordHash = function(passwordHash) {
         var resp = {}
         var passwordFields = passwordHash.split('$');
         resp.salt = passwordFields[0];
         resp.hash = passwordFields[1];
         return (resp)
         // })
     }


     this.getPaginationDetails = function(count, currentpage) {
         return new Promise(function(resolve) {
             var resp = {}
             var pageSize = 10,
                 pageCount = 0,
                 start = 0,
                 page = currentpage;
             if (count == 0) {
                 resp.paginateStatus = 'true'
                 resp.totalPages = 0
                 resp.pageSize = pageSize
                 resp.startPage = start
                 resolve(resp)
             } else {
                 pageCount = Math.ceil(count / pageSize);
                 if (typeof currentpage !== 'undefined') {
                     currentpage = page;
                 }
                 if (currentpage > 1) //counting page with number of post (pagination)
                 {
                     start = (currentpage - 1) * pageSize;
                 }
                 if (page == 0 || page > pageCount) {
                     resp.paginateStatus = 'true'
                     resp.totalPages = 0
                     resp.pageSize = pageSize
                     resp.startPage = start
                     resolve(resp)
                 } else {
                     resp.paginateStatus = 'false'
                     resp.totalPages = pageCount
                     resp.pageSize = pageSize
                     resp.startPage = start
                     resolve(resp)
                 }
             }
         })
     }


     this.sendNotification = function(data) {
         console.log('devicetoken', data)
         console.log('devicetoken', data.fcmToken)
         data.os = data.os.toLowerCase()
         return new Promise(function(resolve) {
             if (data.os == 'ios') {
                 var message = {
                     to: data.fcmToken, // required fill with device token or topics
                     collapse_key: 'your_collapse_key',
                     data: {
                         your_custom_data_key: data.id,
                         type: data.type
                     },
                     notification: {
                         title: data.title,
                         body: data.body,
                         userId: data.userId,
                         bookingId: data.bookingId,
                         sound: "default",
                         icon: "cryp"
                     }
                 };
             } else {
                 var message = {
                     to: data.fcmToken, // required fill with device token or topics
                     collapse_key: 'your_collapse_key',
                     data: {
                         your_custom_data_key: data.id,
                         title: data.title,
                         body: data.body,
                         userId: data.userId,
                         bookingId: data.bookingId,
                         type: data.type
                     },
                     priority: 'high'
                 };
             }
             sendPush(message, function(response) {
                 resolve(response)
             });
         })
     }

     this.sendBulkNotification = function(data) {
         return new Promise(function(resolve) {
             var message = {
                 registration_ids: data.deviceToken, // required fill with device token or topics
                 collapse_key: 'your_collapse_key',
                 data: {
                     title: "Notification From Admin",
                     body: data.body,
                     sound: "default",
                     icon: "cryp"
                 },
                 notification: {
                     title: "Notification From Admin",
                     body: data.body,
                     sound: "default",
                     icon: "cryp"
                 }
             };
             sendPush(message, function(response) {
                 resolve(response)
             });
         })
     }



     this.sendPush = function(message, callback) {
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
             callback(res)
         });
     }

     this.sendEmail = function(data) {
         console.log('send mail', data)
         return new Promise(function(resolve) {
             var transporter = nodemailer.createTransport({
                 host: process.env.SMTP_SERVER,
                 port: process.env.SMTP_PORT,
                 secure: process.env.SMTP_SECURE,
                 auth: {
                     user: process.env.SMTP_USER,
                     pass: process.env.SMTP_PASSWORD
                 }
             })

             // var text = `email: ${data.email} name: ${data.name} Password: ${data.doctorPassword} App Login URL : ${process.env.DOCTOR_PANEL_URL}`

             var mailOptions = {
                 from: process.env.SMTP_FROM,
                 to: data.email,
                 subject: data.subject,
                 text: data.text
                 // html: doctorEmaiTemplate
             }

             transporter.sendMail(mailOptions, function(error, info) {
                 if (error) {
                     console.log('Email Not sent: ' + error)
                     resolve(error)
                 } else {
                     console.log('Email sent: ' + info.response)
                     resolve("Sent")
                 }
             })
         })
     }

     this.generateToken = function(data) {
         return new Promise(function(resolve) {
             jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME }, (err, token) => {
                 if (err) {
                     resolve(err)
                 } else {
                     resolve(token)
                 }
             })
         })
     }

     this.generateRefreshToken = function(data) {
         return new Promise(function(resolve) {
             jwt.sign(data, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY_TIME }, (err, token) => {
                 if (err) {
                     resolve(err)
                 } else {
                     resolve(token)
                 }
             })
         })
     }

     this.getPayloadFromToken = function(token) {
         var data = {}
         return new Promise(function(resolve) {
             jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                 if (err) {
                     data.error = "true"
                     data.data = "null"
                     resolve(data)
                 } else {
                     data.error = "false"
                     data.data = payload
                     resolve(data)
                 }
             })
         })
     }

     this.getPayloadFromRefreshToken = function(token) {
         var data = {}
         return new Promise(function(resolve) {
             jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, payload) => {
                 if (err) {
                     data.error = "true"
                     data.data = "null"
                     resolve(data)
                 } else {
                     data.error = "false"
                     data.data = payload
                     resolve(data)
                 }
             })
         })
     }

 }