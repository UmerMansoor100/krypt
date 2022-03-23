module.exports = function() {
    var loginService = require('../services/account_service.js')
    require('../utils/common.js')()

    this.createAccountController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var createAccountService = await loginServiceObject.createAccountService(req)
        if (createAccountService.error == "true") {
            response.error = "true"
            response.message = createAccountService.message
            response.statusCode = createAccountService.statusCode
        } else {
            response.error = "false"
            response.message = createAccountService.message
            response.statusCode = createAccountService.statusCode
            response.data = createAccountService.result
        }
        callback(response)
    }

    this.loginAccountController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var loginAccountService = await loginServiceObject.loginAccountService(req)
        console.log('loginAccountService', loginAccountService)
        if (loginAccountService.error == "true") {
            response.error = "true"
            response.message = loginAccountService.message
            response.statusCode = loginAccountService.statusCode
            response.data = loginAccountService.result
        } else {
            response.error = "false"
            response.message = loginAccountService.message
            response.statusCode = loginAccountService.statusCode
            response.data = loginAccountService.result
        }
        callback(response)
    }

    this.updatePasswordController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var loginAccountService = await loginServiceObject.updatePasswordService(req)
        if (loginAccountService.error == "true") {
            response.error = "true"
            response.message = loginAccountService.message
            response.statusCode = loginAccountService.statusCode
            response.data = loginAccountService.result
        } else {
            response.error = "false"
            response.message = loginAccountService.message
            response.statusCode = loginAccountService.statusCode
            response.data = loginAccountService.result
        }
        callback(response)
    }

    this.updateDeviceTokenController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var updateDeviceTokenService = await loginServiceObject.updateDeviceTokenService(req)
        if (updateDeviceTokenService.error == "true") {
            response.error = "true"
            response.message = updateDeviceTokenService.message
            response.statusCode = updateDeviceTokenService.statusCode
        } else {
            response.error = "false"
            response.message = updateDeviceTokenService.message
            response.statusCode = updateDeviceTokenService.statusCode
            response.data = updateDeviceTokenService.result
        }
        callback(response)
    }

    this.sendTestNotificationController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var sendTestNotification = await loginServiceObject.sendTestNotificationService(req)
        if (sendTestNotification.error == "true") {
            response.error = "true"
            response.message = sendTestNotification.message
            response.statusCode = sendTestNotification.statusCode
        } else {
            response.error = "false"
            response.message = sendTestNotification.message
            response.statusCode = sendTestNotification.statusCode
            response.data = sendTestNotification.result
        }
        callback(response)
    }

    this.getPropertiesController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var getPropertiesService = await loginServiceObject.getPropertiesService(req)
        if (getPropertiesService.error == "true") {
            response.error = "true"
            response.message = getPropertiesService.message
            response.statusCode = getPropertiesService.statusCode
        } else {
            response.error = "false"
            response.message = getPropertiesService.message
            response.statusCode = getPropertiesService.statusCode
            response.data = getPropertiesService.result
        }
        callback(response)
    }

    this.getUserDetailsController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var getUserDetailsService = await loginServiceObject.getUserDetailsService(req)
        if (getUserDetailsService.error == "true") {
            response.error = "true"
            response.message = getUserDetailsService.message
            response.statusCode = getUserDetailsService.statusCode
        } else {
            response.error = "false"
            response.message = getUserDetailsService.message
            response.statusCode = getUserDetailsService.statusCode
            response.data = getUserDetailsService.result
        }
        callback(response)
    }

    this.getUsersPropertiesController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var getUsersProperties = await loginServiceObject.getUsersPropertiesService(req)
        if (getUsersProperties.error == "true") {
            response.error = "true"
            response.message = getUsersProperties.message
            response.statusCode = getUsersProperties.statusCode
        } else {
            response.error = "false"
            response.message = getUsersProperties.message
            response.statusCode = getUsersProperties.statusCode
            response.data = getUsersProperties.result
        }
        callback(response)
    }


    this.updatePropertiesController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var updatePropertiesService = await loginServiceObject.updatePropertiesService(req)
        if (updatePropertiesService.error == "true") {
            response.error = "true"
            response.message = updatePropertiesService.message
            response.statusCode = updatePropertiesService.statusCode
        } else {
            response.error = "false"
            response.message = updatePropertiesService.message
            response.statusCode = updatePropertiesService.statusCode
            response.data = updatePropertiesService.result
        }
        callback(response)
    }

    this.createCallController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var createCallService = await loginServiceObject.createCallService(req)
        if (createCallService.error == "true") {
            response.error = "true"
            response.message = createCallService.message
            response.statusCode = createCallService.statusCode
        } else {
            response.error = "false"
            response.message = createCallService.message
            response.statusCode = createCallService.statusCode
            response.data = createCallService.result
        }
        callback(response)
    }

    this.createGroupCallController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var createGroupCallService = await loginServiceObject.createGroupCallService(req)
        if (createGroupCallService.error == "true") {
            response.error = "true"
            response.message = createGroupCallService.message
            response.statusCode = createGroupCallService.statusCode
        } else {
            response.error = "false"
            response.message = createGroupCallService.message
            response.statusCode = createGroupCallService.statusCode
            response.data = createGroupCallService.result
        }
        callback(response)
    }

    this.acceptCallController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var acceptCallService = await loginServiceObject.acceptCallService(req)
        if (acceptCallService.error == "true") {
            response.error = "true"
            response.message = acceptCallService.message
            response.statusCode = acceptCallService.statusCode
        } else {
            response.error = "false"
            response.message = acceptCallService.message
            response.statusCode = acceptCallService.statusCode
            response.data = acceptCallService.result
        }
        callback(response)
    }

    this.searchUsersController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var searchUsersService = await loginServiceObject.searchUsersService(req)
        if (searchUsersService.error == "true") {
            response.error = "true"
            response.message = searchUsersService.message
            response.statusCode = searchUsersService.statusCode
        } else {
            response.error = "false"
            response.message = searchUsersService.message
            response.statusCode = searchUsersService.statusCode
            response.data = searchUsersService.result
        }
        callback(response)
    }

    this.rejectCallController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var rejectCallService = await loginServiceObject.rejectCallService(req)
        if (rejectCallService.error == "true") {
            response.error = "true"
            response.message = rejectCallService.message
            response.statusCode = rejectCallService.statusCode
        } else {
            response.error = "false"
            response.message = rejectCallService.message
            response.statusCode = rejectCallService.statusCode
            response.data = rejectCallService.result
        }
        callback(response)
    }

    this.deleteAccountController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var deleteAccountService = await loginServiceObject.deleteAccountService(req)
        if (deleteAccountService.error == "true") {
            response.error = "true"
            response.message = deleteAccountService.message
            response.statusCode = deleteAccountService.statusCode
            response.data = deleteAccountService.result
        } else {
            response.error = "false"
            response.message = deleteAccountService.message
            response.statusCode = deleteAccountService.statusCode
            response.data = deleteAccountService.result
        }
        callback(response)
    }

    this.blockUserAccountController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var blockUserAccountService = await loginServiceObject.blockUserAccountService(req)
        if (blockUserAccountService.error == "true") {
            response.error = "true"
            response.message = blockUserAccountService.message
            response.statusCode = blockUserAccountService.statusCode
            response.data = blockUserAccountService.result
        } else {
            response.error = "false"
            response.message = blockUserAccountService.message
            response.statusCode = blockUserAccountService.statusCode
            response.data = blockUserAccountService.result
        }
        callback(response)
    }

    this.sendMessageController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var sendMessageService = await loginServiceObject.sendMessageService(req)
        if (sendMessageService.error == "true") {
            response.error = "true"
            response.message = sendMessageService.message
            response.statusCode = sendMessageService.statusCode
            response.data = sendMessageService.result
        } else {
            response.error = "false"
            response.message = sendMessageService.message
            response.statusCode = sendMessageService.statusCode
            response.data = sendMessageService.result
        }
        callback(response)
    }

    this.resetSendMessageController = async (req, callback) => {
        var response = {}
        var loginServiceObject = new loginService()
        var resetSendMessageService = await loginServiceObject.resetSendMessageService(req)
        if (resetSendMessageService.error == "true") {
            response.error = "true"
            response.message = resetSendMessageService.message
            response.statusCode = resetSendMessageService.statusCode
            response.data = resetSendMessageService.result
        } else {
            response.error = "false"
            response.message = resetSendMessageService.message
            response.statusCode = resetSendMessageService.statusCode
            response.data = resetSendMessageService.result
        }
        callback(response)
    }
}