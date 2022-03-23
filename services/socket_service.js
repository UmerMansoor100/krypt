module.exports = function() {
    var userDao = require('../dao/account_dao.js')
    require('../utils/common.js')()
    require('dotenv').config()

    this.updateOnlineService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.lastLoginTime = new Date()
                var updateOnlineStatus = await userDaoObject.updateOnlineStatusDao(userData)
                if (updateOnlineStatus.error === 'false') {
                    response.error = "false"
                    response.message = "updated"
                    response.result = userData
                    resolve(response)
                } else {
                    response.error = "true"
                    response.message = "failed to update"
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }

    this.updateOfflineService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var userDaoObject = new userDao()
            try {
                userData.lastLoginTime = new Date()
                var updateOfflineStatus = await userDaoObject.updateOfflineStatusDao(userData)
                if (updateOfflineStatus.error === 'false') {
                    response.error = "false"
                    response.message = "updated"
                    response.result = userData
                    resolve(response)
                } else {
                    response.error = "true"
                    response.message = "failed to update"
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Service Error"
                resolve(err)
            }
        })
    }


    this.updateDisconnectService = (socketId) => {
        return new Promise(async function(resolve) {
            // console.log("userData", socketId)
            var response = {}
            var userDaoObject = new userDao()
            try {
                var lastLoginTime = new Date()
                var getDetailsFromSocketIdDao = await userDaoObject.getDetailsFromSocketIdDao(socketId)
                // console.log("getDetailsFromSocketIdDao", getDetailsFromSocketIdDao.result)
                var updateOfflineStatus = await userDaoObject.updateDisconnectStatusDao(socketId, lastLoginTime)
                // console.log("updateOfflineStatus", updateOfflineStatus.result)
                if (updateOfflineStatus.error === 'false') {
                    response.error = "false"
                    response.message = "updated"
                    response.result = getDetailsFromSocketIdDao.result
                    resolve(response)
                } else {
                    response.error = "true"
                    response.message = "failed to update"
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