module.exports = function() {
    var socketService = require('../services/socket_service.js')
    require('../utils/common.js')()

    this.updateOnlineController = async (req, callback) => {
        var response = {}
        var socketServiceObject = new socketService()
        var updateOnline = await socketServiceObject.updateOnlineService(req)
        if (updateOnline.error == "true") {
            response.error = "true"
            response.message = updateOnline.message
        } else {
            response.error = "false"
            response.message = updateOnline.message
            response.data = updateOnline.result
        }
        callback(response)
    }

    this.updateOfflineController = async (req, callback) => {
        var response = {}
        var socketServiceObject = new socketService()
        var updateOffline = await socketServiceObject.updateOfflineService(req)
        if (updateOffline.error == "true") {
            response.error = "true"
            response.message = updateOffline.message
        } else {
            response.error = "false"
            response.message = updateOffline.message
            response.data = updateOffline.result
        }
        callback(response)
    }

    this.updateDisconnectController = async (socketId, callback) => {
        var response = {}
        var socketServiceObject = new socketService()
        var updateDisconnect = await socketServiceObject.updateDisconnectService(socketId)
        if (updateDisconnect.error == "true") {
            response.error = "true"
            response.message = updateDisconnect.message
        } else {
            response.error = "false"
            response.message = updateDisconnect.message
            response.data = updateDisconnect.result
        }
        callback(response)
    }

}