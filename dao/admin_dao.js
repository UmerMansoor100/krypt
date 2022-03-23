module.exports = function() {
    var mysqlExecute = require("../connection.js");

    this.fetchAdminDetailsById = (Id) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "SELECT * FROM admin WHERE id = ?";
                var queryRequest = [Id];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.selectAdminDetailsFromEmail = (data) => {
        var output = {};
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "SELECT * FROM admin WHERE email = ?";
                var queryRequest = [data.email];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.getAllUsersDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query =
                    "SELECT id,userName,IMEI,createdAt,updatedAt,os,isEnable,passwordAttempt,subsEndDate FROM users  WHERE isEnable = 1 order by id desc";
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.updateUserStatusDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "UPDATE users set isEnable= ? WHERE id= ?";
                var queryRequest = [data.isEnable, data.id];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };
    this.setUserSubsDateDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "UPDATE users set subsEnddate= ?, subsStartDate = ? WHERE id= ?";
                var queryRequest = [data.enddate, data.subsStartDate, data.id];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.getUserDetailsByIdDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query =
                    "SELECT id,userName,IMEI,os,deviceToken,passwordAttempt,createdAt,updatedAt,isEnable,subsEndDate FROM users WHERE id = ? AND isEnable = 1";
                var queryRequest = [data.id];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.getUserDetailsByIMEIDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query =
                    "SELECT id,userName,IMEI,os,deviceToken,passwordAttempt,createdAt,updatedAt,isEnable,subsEndDate FROM users WHERE IMEI = ? AND isEnable = 0 order by id desc";
                var queryRequest = [data.IMEI];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.saveOTPDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "UPDATE admin set otp= ? WHERE email= ?";
                var queryRequest = [data.otp, data.email];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.verifyOTPDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "select id, email, otp from admin WHERE email= ?";
                var queryRequest = [data.email];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

    this.resetPasswordDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "UPDATE admin set password = ? WHERE email= ?";
                var queryRequest = [data.password, data.email];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };
    this.verifyEmailDao = (data) => {
        return new Promise(async function(resolve) {
            var output = {};
            try {
                var mysqlExecuteCall = new mysqlExecute();
                var query = "select id,email from admin WHERE email= ?";
                var queryRequest = [data.email];
                var queryResponse = await mysqlExecuteCall.executeWithParams(
                    query,
                    queryRequest
                );
                if (queryResponse.error == "false") {
                    resolve(queryResponse);
                } else {
                    resolve(queryResponse);
                }
            } catch (err) {
                output.error = "true";
                output.message = "OOPS DAO Exception";
                resolve(output);
            }
        });
    };

};