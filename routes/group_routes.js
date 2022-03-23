module.exports = function(app, validator) {
    var userPath = '/users'
    require('../utils/error.js')()
    var groupController = require('../controllers/group_controller.js')


    app.post(userPath + '/createGroup', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('groupName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Name'),
        validator.check('image').optional().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image'),
        validator.check('groupType').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Type'),
        validator.check('groupTitleName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Title Name'),
        validator.check('description').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], Description')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.createGroupController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/updateGroupProperty', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name'),
        validator.check('groupName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Name'),
        validator.check('image').optional().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image'),
        validator.check('groupType').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Type'),
        validator.check('groupTitleName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Title Name'),
        validator.check('oldGroupTitleName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Old Group Title Name'),
        validator.check('description').optional().isLength({ min: 1 }).withMessage('INVALID: $[1], Description')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.updateGroupPropertyController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/joinGroup', [
        validator.check('userName').isLength({ min: 1 }).withMessage('INVALID: $[1], User Name'),
        validator.check('groupName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Name'),
        validator.check('role').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Role')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.joinGroupController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/getGroupDetails', [
        validator.check('userName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], User Name')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.getGroupDetailsController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })

    app.post(userPath + '/removeUserFromGroup', [
        validator.check('userName').isLength({ min: 1 }).withMessage('INVALID: $[1], User Name'),
        validator.check('groupName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Name'),
        validator.check('role').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Role')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.removeUserFromGroupController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })


    app.post(userPath + '/quitFromGroup', [
        validator.check('userName').isLength({ min: 1 }).withMessage('INVALID: $[1], User Name'),
        validator.check('groupName').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Group Name'),
        validator.check('role').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Role')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var groupControllerObject = new groupController()
            groupControllerObject.quitFromGroupController(request.body, function(result) {
                this.ctrlHandler([result], result.error, lang, (message) => {
                    return response.status(200).send(message)
                })
            })
        }
    })
}