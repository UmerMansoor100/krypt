module.exports = function() {
    var groupDao = require('../dao/group_dao.js')
    require('../utils/common.js')()
    require('dotenv').config()
    var requestPromise = require('minimal-request-promise')

    this.createGroupService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var groupDaoObject = new groupDao()
            try {
                var createGroupDetailsDao = await groupDaoObject.createGroupDetailsDao(userData)
                console.log('createGroupDetailsDao', createGroupDetailsDao)
                if (createGroupDetailsDao.error == 'true') {
                    response.error = 'true'
                    response.message = "create group failed"
                    response.statusCode = 200
                    resolve(response)
                } else {
                    var request = {
                        description: userData.description,
                        naturalName: userData.groupTitleName,
                        roomName: userData.groupName,
                        maxUsers: "200",
                        persistent: "true",
                        publicRoom: "true",
                        logEnabled: "true",
                        "admins": [
                            userData.userName
                        ],
                        "broadcastPresenceRoles": [
                            "moderator",
                            "participant",
                            "visitor"
                        ],
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
                    var RestApiURL = process.env.REST_ENDPOINT + 'chatrooms'
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.post(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "group created"
                            response.statusCode = response.statusCode
                            var insertArr = {}
                            insertArr.groupName = userData.groupName
                            insertArr.userName = userData.userName
                            insertArr.role = 'admin'
                            var joinGroupDetailsDao = await groupDaoObject.joinGroupDetailsDao(insertArr)
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

    this.updateGroupPropertyService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var groupDaoObject = new groupDao()
            // try {
            var getGroupDetailsDao = await groupDaoObject.getGroupDetailsDao(userData)
            if (getGroupDetailsDao.error == 'true' || getGroupDetailsDao.result.length == 0) {
                response.error = 'true'
                response.message = "fetch failed"
                response.statusCode = 200
                resolve(response)
            } else {
                if (getGroupDetailsDao.result[0].userName === userData.userName) {
                    var request = {
                        description: userData.description,
                        naturalName: userData.groupTitleName,
                        roomName: userData.groupName,
                        maxUsers: "200",
                        persistent: "true",
                        publicRoom: "true",
                        logEnabled: "true",
                        "admins": [
                            userData.userName
                        ],
                        "broadcastPresenceRoles": [
                            "moderator",
                            "participant",
                            "visitor"
                        ],
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
                    var RestApiURL = process.env.REST_ENDPOINT + 'chatrooms/' + userData.groupName
                    console.log('RestApiURL', RestApiURL)
                    console.log('requestData', requestData)
                    requestPromise.put(RestApiURL, options)
                        .then(async function(response) {
                            console.log('response', response)
                            response.error = 'false'
                            response.message = "group updated successfully"
                            response.statusCode = response.statusCode
                            var updateGroupDetailsDao = await groupDaoObject.updateGroupDetailsDao(userData)
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
                    response.message = "Invalid Group Access"
                    response.statusCode = 200
                    resolve(response)
                }
            }
            // } catch (err) {
            //     err.error = "true"
            //     err.message = "OOPS Service Error"
            //     resolve(err)
            // }
        })
    }

    this.joinGroupService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var groupDaoObject = new groupDao()
            try {
                var userNameArray = JSON.parse(userData.userName)
                var length = userNameArray.length
                userNameArray.forEach(async function(data, index) {
                    var insertArr = {}
                    insertArr.groupName = userData.groupName
                    insertArr.userName = data.userName
                    insertArr.role = userData.role
                    var checkJoinGroupDetailsDao = await groupDaoObject.checkJoinGroupDetailsDao(insertArr)
                    if (checkJoinGroupDetailsDao.result.length == 0) {
                        var joinGroupDetailsDao = await groupDaoObject.joinGroupDetailsDao(insertArr)
                        console.log('joinGroupDetailsDao', joinGroupDetailsDao)
                        if (joinGroupDetailsDao.error == 'true') {
                            response.error = 'true'
                            response.message = "join group failed"
                            response.statusCode = 200
                            resolve(response)
                        } else {
                            var request = {}
                            var requestData = JSON.stringify(request)
                            const options = {
                                headers: {
                                    'Authorization': process.env.SECRET_KEY,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: requestData
                            }
                            var RestApiURL = process.env.REST_ENDPOINT + 'chatrooms/' + userData.groupName + '/' + userData.role + '/' + data.userName
                            console.log('RestApiURL', RestApiURL)
                            console.log('requestData', requestData)
                            requestPromise.post(RestApiURL, options)
                                .then(async function(response) {
                                    console.log('response', response)
                                    response.error = 'false'
                                    response.message = "user joined successfully"
                                    response.statusCode = response.statusCode
                                    if (0 == --length) {
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
                                    if (0 == --length) {
                                        resolve(error)
                                    }
                                })
                        }
                    } else {
                        if (0 == --length) {
                            response.error = 'false'
                            response.message = "user joined successfully"
                            resolve(response)
                        }
                    }
                })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.removeUserFromGroupService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var groupDaoObject = new groupDao()
            try {
                var insertArr = {}
                insertArr.groupName = userData.groupName
                insertArr.userName = userData.userName
                insertArr.role = userData.role
                var checkJoinGroupDetailsDao = await groupDaoObject.checkJoinGroupDetailsDao(insertArr)
                if (checkJoinGroupDetailsDao.result.length > 0) {
                    var deleteUserFromGroupDetailsDao = await groupDaoObject.deleteUserFromGroupDetailsDao(insertArr)
                    if (deleteUserFromGroupDetailsDao.error == 'true') {
                        response.error = 'true'
                        response.message = "failed to kickoff a participant from group"
                        response.statusCode = 200
                        resolve(response)
                    } else {
                        const options = {
                            headers: {
                                'Authorization': process.env.SECRET_KEY,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                        var RestApiURL = process.env.REST_ENDPOINT + 'chatrooms/' + userData.groupName + '/' + userData.role + '/' + userData.userName
                        console.log('RestApiURL', RestApiURL)
                        requestPromise.delete(RestApiURL, options)
                            .then(async function(response) {
                                console.log('response', response)
                                response.error = 'false'
                                response.message = "successfully kicked off from group"
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
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not available in this group"
                    response.statusCode = response.statusCode
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }


    this.quitUserFromGroupService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var groupDaoObject = new groupDao()
            try {
                var insertArr = {}
                insertArr.groupName = userData.groupName
                insertArr.userName = userData.userName
                insertArr.role = userData.role
                var checkJoinGroupDetailsDao = await groupDaoObject.checkJoinGroupDetailsDao(insertArr)
                if (checkJoinGroupDetailsDao.result.length > 0) {
                    var deleteUserFromGroupDetailsDao = await groupDaoObject.deleteUserFromGroupDetailsDao(insertArr)
                    if (deleteUserFromGroupDetailsDao.error == 'true') {
                        response.error = 'true'
                        response.message = "failed to kickoff a participant from group"
                        response.statusCode = 200
                        resolve(response)
                    } else {
                        const options = {
                            headers: {
                                'Authorization': process.env.SECRET_KEY,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                        var RestApiURL = process.env.REST_ENDPOINT + 'chatrooms/' + userData.groupName + '/' + userData.role + '/' + userData.userName
                        console.log('RestApiURL', RestApiURL)
                        requestPromise.delete(RestApiURL, options)
                            .then(async function(response) {
                                console.log('response', response)
                                response.error = 'false'
                                response.message = "successfully kicked off from group"
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
                    }
                } else {
                    response.error = 'true'
                    response.message = "user not available in this group"
                    response.statusCode = response.statusCode
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.getGroupDetailsService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var groupsData = []
            var groupDaoObject = new groupDao()
            try {
                var getUsersGroupDetailsDao = await groupDaoObject.getUsersGroupDetailsDao(userData)
                var getUsersChatDetailsDao = await groupDaoObject.getUsersChatDetailsDao(userData)
                var groupLength = getUsersGroupDetailsDao.result.length
                if (groupLength > 0) {
                    getUsersGroupDetailsDao.result.forEach(async function(group, index) {
                        var groupArr = {}
                        groupArr.groupName = group.groupName
                        var getGroupDetailsDao = await groupDaoObject.getGroupDetailsDao(groupArr)
                        if (getGroupDetailsDao.error == 'true') {
                            response.error = 'true'
                            response.message = "fetch failed"
                            response.statusCode = 200
                            resolve(response)
                        } else {
                            response.error = 'false'
                            response.message = "group and participants listed successfully"
                            groupsData.push(getGroupDetailsDao.result[0])
                            if (0 == --groupLength) {
                                var length = groupsData.length
                                groupsData.forEach(async function(data, index) {
                                    var req = {}
                                    req.groupId = data.groupName
                                    var getGroupParticipantsDetailsDao = await groupDaoObject.getGroupParticipantsDetailsDao(req)
                                    groupsData[index].participants = getGroupParticipantsDetailsDao.result
                                    if (0 === --length) {
                                        resp.groupsData = groupsData
                                        var res = userData.userName.split("@");
                                        userData.userName = res[0]
                                        var getBlockedUsersDetailsDao = await groupDaoObject.getBlockedUsersDetailsDao(userData)
                                        resp.blockedUsers = getBlockedUsersDetailsDao.result
                                        resp.chatUsers = getUsersChatDetailsDao.result
                                        response.result = resp
                                        resolve(response)
                                    }
                                })
                            }
                        }
                    })
                } else {
                    response.error = 'false'
                    response.message = "group and participants listed successfully"
                    resp.groupsData = groupsData
                    var res = userData.userName.split("@");
                    userData.userName = res[0]
                    var getBlockedUsersDetailsDao = await groupDaoObject.getBlockedUsersDetailsDao(userData)
                    resp.blockedUsers = getBlockedUsersDetailsDao.result
                    resp.chatUsers = getUsersChatDetailsDao.result
                    response.result = resp
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