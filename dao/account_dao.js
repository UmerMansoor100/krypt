module.exports = function() {
    var mysqlExecute = require('../connection.js')


    this.loginDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users WHERE userName = ?"
                var queryRequest = [data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.getDetailsFromSocketIdDao = (socketId) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users WHERE socketId = ?"
                var queryRequest = [socketId]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateOnlineStatusDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET lastLoginTime = ?, socketId = ?, isOnline = 1 WHERE UPPER(userName) = ?"
                var queryRequest = [data.lastLoginTime, data.socketId, data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateDisconnectStatusDao = (socketId, lastLoginTime) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET lastLoginTime = ?, isOnline = 0 WHERE socketId = ? "
                var queryRequest = [lastLoginTime, socketId]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateOfflineStatusDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET lastLoginTime = ?, isOnline = 0 WHERE UPPER(userName) = ?"
                var queryRequest = [data.lastLoginTime, data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updatePasswordDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET password = ? WHERE userName = ?"
                var queryRequest = [data.hpassword, data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.getUserDetailsFromUserNameDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users WHERE userName = ?"
                var queryRequest = [data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.selectMessageDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users_chat WHERE fromUserName = ? AND toUserName = ?"
                var queryRequest = [data.fromUserName, data.toUserName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }


    this.insertMessageDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "INSERT INTO users_chat (fromUserName,toUserName,timestamp, count) VALUES(?,?,?,?)"
                var queryRequest = [data.fromUserName, data.toUserName, data.timestamp, data.count]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateMessageDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users_chat SET timestamp = ?, count = count + 1 WHERE fromUserName = ? AND toUserName = ?"
                var queryRequest = [data.timestamp, data.fromUserName, data.toUserName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.resetMessageDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users_chat SET timestamp = ?, count = 0 WHERE fromUserName = ? AND toUserName = ?"
                var queryRequest = [data.timestamp, data.fromUserName, data.toUserName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.getAllUserDetailsDao = () => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.getUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users WHERE userName = ? OR IMEI = ?"
                var queryRequest = [data.userName, data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.getCripCodeDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users WHERE userName = ?"
                var queryRequest = [data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.deleteUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "DELETE FROM users where userName = ?"
                var queryRequest = [data.userName]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.createUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "INSERT INTO users(userName,IMEI,password) VALUES(?,?,?)"
                var queryRequest = [data.userName, data.IMEI, data.hpassword]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateDeactiveUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET isEnable = 0 WHERE IMEI = ?"
                var queryRequest = [data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateUserPasswordAttemptDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET passwordAttempt = passwordAttempt + 1 WHERE IMEI = ?"
                var queryRequest = [data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.updateUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET os = ? , deviceToken = ?, voipToken = ? WHERE IMEI = ?"
                var queryRequest = [data.os, data.deviceToken, data.voipToken, data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.deleteUserDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "DELETE FROM users WHERE IMEI = ?"
                var queryRequest = [data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.resetUserPasswordAttemptDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE users SET passwordAttempt = 0 WHERE IMEI = ?"
                var queryRequest = [data.IMEI]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.insertBlockDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "INSERT INTO blocked_users(fromUser,toUser) VALUES(?,?)"
                var queryRequest = [data.fromUser, data.toUser]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }

    this.deleteBlockDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "DELETE FROM blocked_users WHERE fromUser = ?  AND toUser = ?"
                var queryRequest = [data.fromUser, data.toUser]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                output.error = "true"
                output.message = "OOPS DAO Exception"
                resolve(output)
            }
        })
    }
}