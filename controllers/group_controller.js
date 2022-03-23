module.exports = function() {
    var groupService = require('../services/group_service.js')
    require('../utils/common.js')()

    this.createGroupController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var createGroupService = await groupServiceObject.createGroupService(req)
        if (createGroupService.error == "true") {
            response.error = "true"
            response.message = createGroupService.message
            response.statusCode = createGroupService.statusCode
        } else {
            response.error = "false"
            response.message = createGroupService.message
            response.statusCode = createGroupService.statusCode
            response.data = createGroupService.result
        }
        callback(response)
    }

    this.updateGroupPropertyController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var updateGroupProperty = await groupServiceObject.updateGroupPropertyService(req)
        if (updateGroupProperty.error == "true") {
            response.error = "true"
            response.message = updateGroupProperty.message
            response.statusCode = updateGroupProperty.statusCode
        } else {
            response.error = "false"
            response.message = updateGroupProperty.message
            response.statusCode = updateGroupProperty.statusCode
            response.data = updateGroupProperty.result
        }
        callback(response)
    }

    this.joinGroupController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var joinGroupService = await groupServiceObject.joinGroupService(req)
        if (joinGroupService.error == "true") {
            response.error = "true"
            response.message = joinGroupService.message
            response.statusCode = joinGroupService.statusCode
        } else {
            response.error = "false"
            response.message = joinGroupService.message
            response.statusCode = joinGroupService.statusCode
            response.data = joinGroupService.result
        }
        callback(response)
    }

    this.removeUserFromGroupController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var removeUserFromGroup = await groupServiceObject.removeUserFromGroupService(req)
        if (removeUserFromGroup.error == "true") {
            response.error = "true"
            response.message = removeUserFromGroup.message
            response.statusCode = removeUserFromGroup.statusCode
        } else {
            response.error = "false"
            response.message = removeUserFromGroup.message
            response.statusCode = removeUserFromGroup.statusCode
            response.data = removeUserFromGroup.result
        }
        callback(response)
    }

    this.quitFromGroupController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var removeUserFromGroup = await groupServiceObject.quitUserFromGroupService(req)
        if (removeUserFromGroup.error == "true") {
            response.error = "true"
            response.message = removeUserFromGroup.message
            response.statusCode = removeUserFromGroup.statusCode
        } else {
            response.error = "false"
            response.message = removeUserFromGroup.message
            response.statusCode = removeUserFromGroup.statusCode
            response.data = removeUserFromGroup.result
        }
        callback(response)
    }

    this.getGroupDetailsController = async (req, callback) => {
        var response = {}
        var groupServiceObject = new groupService()
        var getGroupDetailsService = await groupServiceObject.getGroupDetailsService(req)
        if (getGroupDetailsService.error == "true") {
            response.error = "true"
            response.message = getGroupDetailsService.message
            response.statusCode = getGroupDetailsService.statusCode
        } else {
            response.error = "false"
            response.message = getGroupDetailsService.message
            response.statusCode = getGroupDetailsService.statusCode
            response.data = getGroupDetailsService.result
        }
        callback(response)
    }
}