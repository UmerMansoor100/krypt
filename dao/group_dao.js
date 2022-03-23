module.exports = function() {
    var mysqlExecute = require('../connection.js')


    this.createGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "INSERT INTO groups (groupName,userName,description,type,groupTitleName,image) VALUES(?,?,?,?,?,?)"
                var queryRequest = [data.groupName, data.userName, data.description, data.groupType, data.groupTitleName, data.image]
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

    this.updateGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "UPDATE groups SET groupName = ? , description = ?,type = ?,groupTitleName = ?,image = ? WHERE userName = ? AND groupName = ? AND groupTitleName = ?"
                var queryRequest = [data.groupName, data.description, data.groupType, data.groupTitleName, data.image, data.userName, data.oldGroupName, data.oldGroupTitleName]
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


    this.joinGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "INSERT INTO group_participants (groupId,userName,role) VALUES(?,?,?)"
                var queryRequest = [data.groupName, data.userName, data.role]
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

    this.deleteUserFromGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "DELETE FROM group_participants WHERE groupId = ? AND userName = ? AND role = ?"
                var queryRequest = [data.groupName, data.userName, data.role]
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

    this.checkJoinGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM group_participants WHERE groupId = ? AND userName = ?"
                var queryRequest = [data.groupName, data.userName]
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

    this.getUsersChatDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var res = data.userName.split("@");
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM users_chat WHERE toUserName = ?"
                var queryRequest = [res[0]]
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

    this.getUsersGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT groupName AS groupName FROM groups WHERE userName = ? UNION DISTINCT SELECT groupId AS groupName FROM group_participants WHERE userName = ?"
                var queryRequest = [data.userName, data.userName]
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

    this.getGroupDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM groups WHERE groupName = ?"
                var queryRequest = [data.groupName]
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

    this.getGroupParticipantsDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM group_participants WHERE groupId = ?"
                var queryRequest = [data.groupId]
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

    this.getBlockedUsersDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT * FROM blocked_users WHERE fromUser = ?"
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
}