module.exports = function() {
    var userDao = require('../dao/account_dao.js')
    require('../utils/common.js')()
    require('dotenv').config()
    var requestPromise = require('minimal-request-promise')

    this.createAccountService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.getCripCodeDetailsDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    response.error = 'true'
                    response.message = "already registered"
                    response.statusCode = 200
                    resolve(response)
                } else {
                    var request = {
                        username: userData.userName,
                        password: userData.password,
                        // name: userData.name,
                        // email: userData.email,
                    }
                    if (userData.properties) {
                        request.properties = JSON.parse(userData.properties)
                    }
                    var requestData = JSON.stringify(request)
                    const options = {
                        headers: {
                            'Authorization': process.env.SECRET_KEY,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: requestData
                    }
                    var RestApiURL = process.env.REST_ENDPOINT + 'users'
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.post(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = response.statusMessage
                            response.statusCode = response.statusCode
                            userData.hpassword = this.generatePasswordHash(userData.password)
                            var updateDeactiveUserDetailsDao = await userDaoObject.updateDeactiveUserDetailsDao(userData)
                            var createUserDetailsDao = await userDaoObject.createUserDetailsDao(userData)
                            resolve(response)
                        })
                        .catch(function(error) {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        })
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.loginAccountService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var request = {
                    password: userData.password
                }
                var requestData = JSON.stringify(request)
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: requestData
                }
                var getUserDetailsDao = await userDaoObject.loginDetailsDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    if (getUserDetailsDao.result[0].isEnable == 0) {
                        response.error = 'true'
                        response.message = "Your account has been Deactivated"
                        response.statusCode = 200
                        resolve(response);
                    } else if (getUserDetailsDao.result[0].IMEI == userData.IMEI && getUserDetailsDao.result[0].isEnable == 1) {
                        var passwordHash = this.spiltPasswordHash(getUserDetailsDao.result[0].password)
                        var hash = this.reGeneratePasswordHash(userData.password, passwordHash.salt)
                        if (hash === passwordHash.hash) {
                            var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + getUserDetailsDao.result[0].userName
                            console.log('RestApiURL', RestApiURL)
                            console.log('requestData', requestData)
                            requestPromise.get(RestApiURL, options)
                                .then(async function(response) {
                                    var resetUserPasswordAttemptDao = await userDaoObject.resetUserPasswordAttemptDao(userData)
                                    console.log('response', response)
                                    response.error = 'false'
                                    response.message = "login success"
                                    var resp = JSON.parse(response.body)
                                    response.statusCode = response.statusCode
                                    resp.passwordAttempt = getUserDetailsDao.result[0].passwordAttempt
                                    response.result = resp
                                    resolve(response)
                                })
                                .catch(function(error) {
                                    console.log('error', error)
                                    error.error = 'true'
                                    if (error.body) {
                                        var body = JSON.parse(error.body)
                                        error.message = body.message
                                    } else {
                                        error.message = error.statusMessage
                                    }
                                    error.statusCode = error.statusCode
                                    resolve(error)
                                })
                        } else {
                            var updateUserPasswordAttemptDao = await userDaoObject.updateUserPasswordAttemptDao(userData)
                            if (getUserDetailsDao.result[0].passwordAttempt >= 6) {
                                var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + getUserDetailsDao.result[0].userName
                                console.log('RestApiURL', RestApiURL)
                                console.log('requestData', requestData)
                                requestPromise.delete(RestApiURL, options)
                                    .then(async function(response) {
                                        console.log('response', response)
                                        response.error = 'true'
                                        response.message = "invalid password"
                                        var resp = {
                                            passwordAttempt: getUserDetailsDao.result[0].passwordAttempt
                                        }
                                        response.result = resp
                                        response.statusCode = 200
                                        var deleteUserDetailsDao = await userDaoObject.deleteUserDetailsDao(userData)
                                        resolve(response)
                                    })
                                    .catch(function(error) {
                                        console.log('error', error)
                                        error.error = 'true'
                                        if (error.body) {
                                            var body = JSON.parse(error.body)
                                            error.message = body.message
                                        } else {
                                            error.message = error.statusMessage
                                        }
                                        error.statusCode = error.statusCode
                                        resolve(error)
                                    })
                            } else {
                                response.error = 'true'
                                response.message = "invalid password"
                                var resp = {
                                    passwordAttempt: getUserDetailsDao.result[0].passwordAttempt
                                }
                                response.result = resp
                                response.statusCode = 200
                                resolve(response)
                            }
                        }
                    } else {
                        response.error = 'true'
                        response.message = "user not authorized to login from this device"
                        response.statusCode = 200
                        resolve(response)
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.updatePasswordService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.loginDetailsDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    userData.hpassword = this.generatePasswordHash(userData.newpassword)
                    var passwordHash = this.spiltPasswordHash(getUserDetailsDao.result[0].password)
                    var hash = this.reGeneratePasswordHash(userData.password, passwordHash.salt)
                    if (hash === passwordHash.hash) {
                        var getUserDetailsDao = await userDaoObject.updatePasswordDetailsDao(userData)
                        response.error = 'false'
                        response.message = "updated successfully"
                        response.statusCode = 200
                        resolve(response)
                    } else {
                        response.error = 'true'
                        response.message = "invalid password"
                        response.statusCode = 200
                        resolve(response)
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.getUserDetailsService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.loginDetailsDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    response.error = 'false'
                    response.message = "retrived success"
                    response.statusCode = 200
                    response.result = getUserDetailsDao.result
                    resolve(response)
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.sendMessageService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.timestamp = new Date().getTime()
                var selectMessageDao = await userDaoObject.selectMessageDao(userData)
                if (selectMessageDao.result.length > 0) {
                    var getUserDetailsDao = await userDaoObject.updateMessageDao(userData)
                } else {
                    userData.count = 1
                    var getUserDetailsDao = await userDaoObject.insertMessageDao(userData)
                }
                if (getUserDetailsDao.error = 'false') {
                    response.error = 'false'
                    response.message = "inserted success"
                    response.statusCode = 200
                    resolve(response)
                } else {
                    response.error = 'true'
                    response.message = "failed to insert"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.resetSendMessageService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.timestamp = new Date().getTime()
                var resetMessageDao = await userDaoObject.resetMessageDao(userData)
                if (resetMessageDao.error = 'false') {
                    response.error = 'false'
                    response.message = "inserted success"
                    response.statusCode = 200
                    resolve(response)
                } else {
                    response.error = 'true'
                    response.message = "failed to insert"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.getPropertiesService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var request = {
                    password: userData.password
                }
                var requestData = JSON.stringify(request)
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: requestData
                }
                var getUserDetailsDao = await userDaoObject.getUserDetailsFromUserNameDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + getUserDetailsDao.result[0].userName
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.get(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "retrived success"
                            response.statusCode = response.statusCode
                            response.result = JSON.parse(response.body)
                            resolve(response)
                        })
                        .catch(function(error) {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        })
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.getUsersPropertiesService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var users = []
            var userDaoObject = new userDao()
            try {
                var userNameData = JSON.parse(userData.userName)
                console.log('userName', userNameData)
                var userNameDataCount = userNameData.length
                if (userNameDataCount > 0) {
                    userNameData.forEach(async function(data, index) {
                        const options = {
                            headers: {
                                'Authorization': process.env.SECRET_KEY,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }
                        var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + data.userName
                        console.log('RestApiURL', RestApiURL)
                        requestPromise.get(RestApiURL, options)
                            .then(async function(response) {
                                console.log('response', response)
                                var parsedData = JSON.parse(response.body)
                                // var obj = {
                                //     [data.userName]: parsedData
                                // }
                                users.push(parsedData)
                                if (0 == --userNameDataCount) {
                                    response.error = 'false'
                                    response.message = "retrived success"
                                    response.statusCode = response.statusCode
                                    response.result = users
                                    resolve(response)
                                }
                            })
                            .catch(function(error) {
                                console.log('error', error)
                                error.error = 'true'
                                if (error.body) {
                                    var body = JSON.parse(error.body)
                                    error.message = body.message
                                } else {
                                    error.message = error.statusMessage
                                }
                                error.statusCode = error.statusCode
                                userNameDataCount = userNameDataCount - 1
                                resolve(error)
                            })
                    })
                } else {
                    response.error = 'true'
                    response.message = "Please Enter some list of users"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.updateDeviceTokenService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.getUserDetailsFromUserNameDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    var updateUserDetailsDao = await userDaoObject.updateUserDetailsDao(userData)
                    if (getUserDetailsDao.result.length > 0) {
                        response.error = 'false'
                        response.message = "user device token update successfully"
                        response.statusCode = 200
                        resolve(response)
                    } else {
                        response.error = 'true'
                        response.message = "user device token update failed"
                        response.statusCode = 200
                        resolve(response)
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.sendTestNotificationService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.getUserDetailsFromUserNameDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    var deviceToken = getUserDetailsDao.result[0].deviceToken
                    var data = {
                        "message": 'wake up ! ...'
                    }
                    var updateUserDetailsDao = await this.sendSingleNotificationWithTopic('heartbeat', data)
                    if (getUserDetailsDao.error == 'false') {
                        response.error = 'false'
                        response.message = "notification send successfully"
                        response.statusCode = 200
                        resolve(response)
                    } else {
                        response.error = 'true'
                        response.message = "failed to send notification"
                        response.statusCode = 200
                        resolve(response)
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }


    this.updatePropertiesService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.getUserDetailsFromUserNameDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    var request = {
                        properties: JSON.parse(userData.properties)
                    }
                    var requestData = JSON.stringify(request)
                    const options = {
                        headers: {
                            'Authorization': process.env.SECRET_KEY,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: requestData
                    }
                    var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + getUserDetailsDao.result[0].userName
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.put(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "updated successfully"
                            response.statusCode = response.statusCode
                            resolve(response)
                        })
                        .catch(function(error) {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        })
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.createCallService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.userName = userData.toUserName
                var getUserDetailsDao = await userDaoObject.getUserDetailsDao(userData)
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
                var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + userData.fromUserName
                console.log('RestApiURL', RestApiURL)
                requestPromise.get(RestApiURL, options)
                    .then(async function(response) {
                        console.log('response', response)
                        response.error = 'false'
                        response.message = "call created successfully"
                        response.statusCode = response.statusCode
                        response.result = JSON.parse(response.body)
                        resolve(response)
                        var payload = {
                            fromUserName: userData.fromUserName,
                            toUserName: userData.toUserName,
                            type: 'create_call',
                            callType: userData.callType,
                            isGroup: "0"
                        }
                        if (response.result.properties.length > 0) {
                            payload.image = response.result.properties[0].value ? response.result.properties[0].value : 'http://167.71.238.226/uploads/user.png'
                        }
                        console.log('payload', payload)
                        if (getUserDetailsDao.result.length > 0) {
                            if (getUserDetailsDao.result[0].os === 'android') {
                                var sendSingleNotification = this.sendSingleNotification(getUserDetailsDao.result[0].deviceToken, payload)
                            } else {
                                var singleVoipCall = this.singleVoipCall(getUserDetailsDao.result[0].voipToken, payload)
                            }
                        } else {
                            response.error = 'true'
                            response.message = "user not registered"
                            response.statusCode = 200
                            resolve(response)
                        }
                    })
                    .catch(function(error) {
                        console.log('error', error)
                        error.error = 'true'
                        if (error.body) {
                            var body = JSON.parse(error.body)
                            error.message = body.message
                        } else {
                            error.message = error.statusMessage
                        }
                        error.statusCode = error.statusCode
                        resolve(error)
                    })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.createGroupCallService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var users = JSON.parse(userData.toUserName)
                var usersLength = users.length
                users.forEach(async function(data, index) {
                    userData.userName = data.name
                    var getUserDetailsDao = await userDaoObject.getUserDetailsDao(userData)
                    const options = {
                        headers: {
                            'Authorization': process.env.SECRET_KEY,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                    var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + userData.fromUserName
                    console.log('RestApiURL', RestApiURL)
                    requestPromise.get(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "call created successfully"
                            response.statusCode = response.statusCode
                            response.result = JSON.parse(response.body)
                            var payload = {
                                fromUserName: userData.fromUserName,
                                toUserName: data.name,
                                type: 'create_call',
                                callType: userData.callType,
                                channelName: userData.channelName,
                                isGroup: "1",
                                groupId: userData.groupId
                            }
                            if (response.result.properties.length > 0) {
                                payload.image = response.result.properties[0].value ? response.result.properties[0].value : 'http://167.71.238.226/uploads/user.png'
                            }
                            console.log('payload', payload)
                            if (getUserDetailsDao.result.length > 0) {
                                if (getUserDetailsDao.result[0].os === 'android') {
                                    var sendSingleNotification = this.sendSingleNotification(getUserDetailsDao.result[0].deviceToken, payload)
                                } else {
                                    var singleVoipCall = this.singleVoipCall(getUserDetailsDao.result[0].voipToken, payload)
                                }
                                if (0 == --usersLength) {
                                    resolve(response)

                                }
                            } else {
                                response.error = 'true'
                                response.message = "user not registered"
                                response.statusCode = 200
                                resolve(response)
                            }
                        })
                        .catch(function(error) {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        })
                })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.acceptCallService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.userName = userData.fromUserName
                var getUserDetailsDao = await userDaoObject.getUserDetailsDao(userData)
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
                var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + userData.fromUserName
                console.log('RestApiURL', RestApiURL)
                requestPromise.get(RestApiURL, options)
                    .then(async function(response) {
                        console.log('response', response)
                        response.error = 'false'
                        response.message = "call accepted successfully"
                        response.statusCode = response.statusCode
                        response.result = JSON.parse(response.body)
                        var payload = {
                            fromUserName: userData.fromUserName,
                            toUserName: userData.toUserName,
                            // image: response.result.properties[0].value,
                            type: 'accept_call'
                        }
                        if (getUserDetailsDao.result.length > 0) {
                            if (getUserDetailsDao.result[0].os === 'android') {
                                var sendSingleNotification = this.sendSingleNotification(getUserDetailsDao.result[0].deviceToken, payload)
                            } else {
                                var singleVoipCall = this.singleVoipCall(getUserDetailsDao.result[0].voipToken, payload)
                            }
                            resolve(response)
                        } else {
                            response.error = 'true'
                            response.message = "user not registered"
                            response.statusCode = 200
                            resolve(response)
                        }
                    })
                    .catch(function(error) {
                        console.log('error', error)
                        error.error = 'true'
                        if (error.body) {
                            var body = JSON.parse(error.body)
                            error.message = body.message
                        } else {
                            error.message = error.statusMessage
                        }
                        error.statusCode = error.statusCode
                        resolve(error)
                    })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.rejectCallService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.userName = userData.toUserName
                var getUserDetailsDao = await userDaoObject.getUserDetailsDao(userData)
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
                var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + userData.fromUserName
                console.log('RestApiURL', RestApiURL)
                requestPromise.get(RestApiURL, options)
                    .then(async function(response) {
                        console.log('response', response)
                        response.error = 'false'
                        response.message = "call rejected successfully"
                        response.statusCode = response.statusCode
                        response.result = JSON.parse(response.body)
                        var payload = {
                            fromUserName: userData.fromUserName,
                            toUserName: userData.toUserName,
                            // image: response.result.properties[0].value,
                            type: 'end_call'
                        }
                        if (getUserDetailsDao.result.length > 0) {
                            if (getUserDetailsDao.result[0].os === 'android') {
                                var sendSingleNotification = this.sendSingleNotification(getUserDetailsDao.result[0].deviceToken, payload)
                            } else {
                                var singleVoipCall = this.singleVoipCall(getUserDetailsDao.result[0].voipToken, payload)
                            }
                            resolve(response)
                        } else {
                            response.error = 'true'
                            response.message = "user not registered"
                            response.statusCode = 200
                            resolve(response)
                        }
                    })
                    .catch(function(error) {
                        console.log('error', error)
                        error.error = 'true'
                        if (error.body) {
                            var body = JSON.parse(error.body)
                            error.message = body.message
                        } else {
                            error.message = error.statusMessage
                        }
                        error.statusCode = error.statusCode
                        resolve(error)
                    })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.searchUsersService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                const options = {
                    headers: {
                        'Authorization': process.env.SECRET_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
                var RestApiURL = process.env.REST_ENDPOINT + 'users' + '/' + userData.name.toLowerCase()
                console.log('RestApiURL', RestApiURL)
                requestPromise.get(RestApiURL, options)
                    .then(async function(response) {
                        console.log('response', response)
                        response.error = 'false'
                        response.message = "retrived success"
                        response.statusCode = response.statusCode
                        response.result = JSON.parse(response.body)
                        resolve(response)
                    })
                    .catch(function(error) {
                        if (error.statusCode == 404) {
                            response.error = 'false'
                            response.message = "retrived success"
                            response.statusCode = response.statusCode
                            response.result = {}
                            resolve(response)
                        } else {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        }
                    })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.deleteAccountService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                var getUserDetailsDao = await userDaoObject.getCripCodeDetailsDao(userData)
                if (getUserDetailsDao.result.length > 0) {
                    var request = {
                        username: userData.userName
                    }
                    var requestData = JSON.stringify(request)
                    const options = {
                        headers: {
                            'Authorization': process.env.SECRET_KEY,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: requestData
                    }
                    var RestApiURL = process.env.REST_ENDPOINT + 'users/' + userData.userName
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.delete(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "user deleted successfully"
                            response.statusCode = response.statusCode
                            var deleteUserDetailsDao = await userDaoObject.deleteUserDetailsDao(userData)
                            resolve(response)
                        })
                        .catch(function(error) {
                            console.log('error', error)
                            error.error = 'true'
                            if (error.body) {
                                var body = JSON.parse(error.body)
                                error.message = body.message
                            } else {
                                error.message = error.statusMessage
                            }
                            error.statusCode = error.statusCode
                            resolve(error)
                        })
                } else {
                    response.error = 'true'
                    response.message = "user not registered"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }


    this.blockUserAccountService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                if (userData.status == 'true') {
                    var getUserDetailsDao = await userDaoObject.insertBlockDetailsDao(userData)
                } else {
                    var getUserDetailsDao = await userDaoObject.deleteBlockDetailsDao(userData)
                }
                if (getUserDetailsDao.error == 'false') {
                    response.error = 'false'
                    response.message = "user block status updated"
                    response.statusCode = 200
                    resolve(response)
                } else {
                    response.error = 'true'
                    response.message = "failed to update block status"
                    response.statusCode = 200
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }
}