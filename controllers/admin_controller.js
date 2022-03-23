module.exports = function () {
  var loginService = require("../services/admin_service.js");
  require("../utils/common.js")();
  require("dotenv").config();

  this.loginAdminController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();
    var loginAdminService = await loginServiceObject.loginAdminService(req);
    if (loginAdminService.error == "true") {
      response.error = "true";
      response.message = loginAdminService.message;
      response.statusCode = loginAdminService.statusCode;
    } else {
      response.error = "false";
      response.message = loginAdminService.message;
      response.data = loginAdminService.result;
    }
    callback(response);
  };

  this.getAllUsersController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();
    var getUsersProperties = await loginServiceObject.getAllUsersService(req);

    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };
  this.updateUserStatusController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();
    var getUsersProperties = await loginServiceObject.updateUserStatusService(
      req
    );

    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    }
    callback(response);
  };

  this.setUserSubsDateController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();
    var getUsersProperties = await loginServiceObject.setUserSubsDateService(
      req
    );

    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    }
    callback(response);
  };
  this.getUserDetailsByIdController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();
    var getUsersProperties = await loginServiceObject.getUserDetailsByIdService(
      req
    );
    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };

  this.sendOTPController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();

    var getUsersProperties = await loginServiceObject.sendOTPService(req);
    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };

  this.verifyOTPController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();

    var getUsersProperties = await loginServiceObject.verifyOTPService(req);
    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };
  
  this.resetPasswordController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();

    var getUsersProperties = await loginServiceObject.resetPasswordService(req);
    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };
  
  this.verifyEmailController = async (req, callback) => {
    var response = {};
    var loginServiceObject = new loginService();

    var getUsersProperties = await loginServiceObject.verifyEmailService(req);
    if (getUsersProperties.error == "true") {
      response.error = "true";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
    } else {
      response.error = "false";
      response.message = getUsersProperties.message;
      response.statusCode = getUsersProperties.statusCode;
      response.data = getUsersProperties.result;
    }
    callback(response);
  };

};
