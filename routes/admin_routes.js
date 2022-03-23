module.exports = function (app, validator) {
  var userPath = "/admin";
  require("../utils/error.js")();
  require("../utils/common.js")();

  var adminController = require("../controllers/admin_controller.js");

  //Login Route
  app.post(
    userPath + "/login",
    [
      validator
        .check("email")
        .isLength({ min: 1, max: 255 })
        .withMessage("INVALID: $[1], Email"),
      validator
        .check("password")
        .isLength({ min: 1, max: 255 })
        .withMessage("INVALID: $[1], Password"),
    ],
    function (request, response) {
      var lang = request.headers.lang;
      var error = validator.validation(request);
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, function (message) {
          response.send(message);
        });
      } else {
        var adminControllerObject = new adminController();
        adminControllerObject.loginAdminController(request.body, function (
          result
        ) {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return response.status(200).send(message);
          });
        });
      }
    }
  );
  //Get All Users
  app.get(userPath + "/getUsers", app.auth, function (request, response) {
    var lang = request.headers.lang;
    var error = validator.validation(request);
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message);
      });
    } else {
      var adminControllerObject = new adminController();
      adminControllerObject.getAllUsersController(request.body, function (
        result
      ) {
        return response.status(200).send(JSON.stringify(result));
      });
    }
  });
  //Activate or DeActivate Users
  app.post(
    userPath + "/updateUserStatus",
    [
      validator
        .check("isEnable")
        .matches(/^[01]$/)
        .withMessage("must contain  0 or 1"),
      validator.check("id").matches(/\d/).withMessage("must contain a number"),
    ],
    app.auth,
    function (request, response) {
      var lang = request.headers.lang;
      var error = validator.validation(request);
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, function (message) {
          response.send(message);
        });
      } else {
        var adminControllerObject = new adminController();
        adminControllerObject.updateUserStatusController(
          request.body,
          function (result) {
            return response.status(200).send(JSON.stringify(result));
          }
        );
      }
    }
  );

  app.post(
    userPath + "/setUserSubsEndDate",
    [validator.check("id").matches(/\d/).withMessage("must contain a number")],
    app.auth,
    function (request, response) {
      var lang = request.headers.lang;
      var error = validator.validation(request);
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, function (message) {
          response.send(message);
        });
      } else {
        var adminControllerObject = new adminController();
        adminControllerObject.setUserSubsDateController(request.body, function (
          result
        ) {
          return response.status(200).send(JSON.stringify(result));
        });
      }
    }
  );

  app.post(
    userPath + "/getUserbyId",
    [
      validator
        .check("id")
        .isLength({ min: 1 })
        .withMessage("INVALID: $[1], User ID"),
    ],
    app.auth,
    function (request, response) {
      var lang = request.headers.lang;
      var error = validator.validation(request);
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, function (message) {
          response.send(message);
        });
      } else {
        var adminControllerObject = new adminController();
        adminControllerObject.getUserDetailsByIdController(
          request.body,
          function (result) {
            return response.status(200).send(JSON.stringify(result));
          }
        );
      }
    }
  );

  app.post(userPath + "/sendOTP",  function (request, response) {
    var lang = request.headers.lang;
    var error = validator.validation(request);
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message);
      });
    } else {
      var adminControllerObject = new adminController();
      adminControllerObject.sendOTPController(request.body, function (result) {
        return response.status(200).send(JSON.stringify(result));
      });
    }
  });

  
  app.post(userPath + "/verifyOTP",  function (request, response) {
    var lang = request.headers.lang;
    var error = validator.validation(request);
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message);
      });
    } else {
      var adminControllerObject = new adminController();
      adminControllerObject.verifyOTPController(request.body, function (
        result
      ) {
        return response.status(200).send(JSON.stringify(result));
      });
    }
  });
  
  app.post(userPath + "/resetPassword", app.auth,  function (request, response) {
    var lang = request.headers.lang;
    var error = validator.validation(request);
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message);
      });
    } else {
      var adminControllerObject = new adminController();
      adminControllerObject.resetPasswordController(request.body, function (
        result
      ) {
        return response.status(200).send(JSON.stringify(result));
      });
    }
  });
  app.post(userPath + "/verifyEmail", function (request, response) {
    var lang = request.headers.lang;
    var error = validator.validation(request);
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, function (message) {
        response.send(message);
      });
    } else {
      var adminControllerObject = new adminController();
      adminControllerObject.verifyEmailController(request.body, function (
        result
      ) {
        return response.status(200).send(JSON.stringify(result));
      });
    }
  });
};
