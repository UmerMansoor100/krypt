module.exports = function(app, validator) {
    var userPath = '/users'
    require('../utils/error.js')()
    var providerController = require('../controllers/account_controller.js')


    app.post(userPath + '/createAccount', [
        validator.check('password').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Password'),
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('IMEI').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], IMEI'),
        validator.check('properties').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], Properties')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.createAccountController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/login', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('password').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Password'),
        validator.check('IMEI').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], IMEI')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.loginAccountController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })


    app.post(userPath + '/updatePassword', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('password').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Password'),
        validator.check('newpassword').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], New Password')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.updatePasswordController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/updateDeviceToken', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('IMEI').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], IMEI'),
        validator.check('os').isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], OS'),
        validator.check('deviceToken').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Device Token'),
        validator.check('voipToken').optional().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], VOIP Token')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.updateDeviceTokenController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/updateProperties', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('IMEI').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], IMEI'),
        validator.check('properties').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], Properties')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.updatePropertiesController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/getProperties', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('IMEI').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], IMEI')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.getPropertiesController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/getUserDetails', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.getUserDetailsController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/getUsersProperties', [
        validator.check('userName').isLength({ min: 1 }).withMessage('INVALID: $[1], User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.getUsersPropertiesController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/searchUsers', [
        validator.check('name').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.searchUsersController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/createCall', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name'),
        validator.check('callType').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Call Type')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.createCallController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/createGroupCall', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1 }).withMessage('INVALID: $[1], To User Name'),
        validator.check('channelName').isLength({ min: 1 }).withMessage('INVALID: $[1], To Channel Name'),
        validator.check('groupId').isLength({ min: 1 }).withMessage('INVALID: $[1], To Group Id'),
        validator.check('callType').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Call Type')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.createGroupCallController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/acceptCall', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.acceptCallController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/rejectCall', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.rejectCallController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/deleteAccount', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.deleteAccountController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/blockUserAccount', [
        validator.check('fromUser').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUser').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name'),
        validator.check('status').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Status')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.blockUserAccountController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/sendtestnotification', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], userName')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.sendTestNotificationController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/sendmessage', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.sendMessageController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/resetsendmessagestatus', [
        validator.check('fromUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], From User Name'),
        validator.check('toUserName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], To User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var providerControllerObject = new providerController()
            providerControllerObject.resetSendMessageController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

}