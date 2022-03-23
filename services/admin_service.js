module.exports = function() {
    var userDao = require("../dao/admin_dao.js");
    require("../utils/common.js")();
    require("dotenv").config();
    var requestPromise = require("minimal-request-promise");

    this.adminAuthService = async (userId, callback) => {
        var response = {};
        try {
            // console.log(userId)
            var userDaoObject = new userDao();
            var userInfo = await userDaoObject.fetchAdminDetailsById(userId);
            // console.log(userInfo)
            if (userInfo.error == "true") {
                response.error = "true";
                response.msg = "UNAUTHORIZED";
            } else {
                response.error = "false";
                response.msg = "VALID";
                response.data = userInfo.result;
            }
            callback(response);
        } catch (err) {
            err.error = "true";
            err.msg = "OOPS";
            callback(err);
        }
    };

    this.loginAdminService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var resp = {};
            var userDaoObject = new userDao();
            try {
                var hashpassword = userData.password ?
                    await this.generatePasswordHashAdmin(userData.password) :
                    null;
                var userDetailsResult = await userDaoObject.selectAdminDetailsFromEmail(
                    userData
                );
                if (userDetailsResult.error == "true") {
                    if (userDetailsResult.result.length == 0) {
                        response.error = "true";
                        response.message = "Login failed! Invalid Admin";
                        resolve(response);
                    } else {
                        response.error = "true";
                        response.message = "Login failed! Please try again";
                        resolve(response);
                    }
                } else {
                    if (userDetailsResult.result[0].password === hashpassword) {
                        var auth = {};
                        auth.id = userDetailsResult.result[0].id;
                        auth.email = userDetailsResult.result[0].email;
                        // resp.token = await this.generateToken(auth, process.env.JWT_SECRET);
                        response.error = "false";
                        response.message = "Admin Login Successfully";
                        response.result = auth;
                        resolve(response);
                    } else {
                        response.error = "true";
                        response.message = "Admin Login Details Failed";
                        resolve(response);
                    }
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };

    this.getAllUsersService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {
                var userDetailsResult = await userDaoObject.getAllUsersDao(userData);
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error1";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "User Data Loaded Successfully";
                    response.result = userDetailsResult.result;
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };

    this.updateUserStatusService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {
                var userDetailsResult = await userDaoObject.updateUserStatusDao(
                    userData
                );
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "User Status Updated Successfully";
                    // response.result = userDetailsResult.result
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };


    this.setUserSubsDateService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {

                userData.subsStartDate = new Date()
                var userDetailsResult = await userDaoObject.setUserSubsDateDao(
                    userData
                );
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "Subscription End Date added Successfully";
                    // response.result = userDetailsResult.result
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };
    this.getUserDetailsByIdService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var resp = {};
            var userDaoObject = new userDao();
            try {
                var userDetailsResult = await userDaoObject.getUserDetailsByIdDao(
                    userData
                );
                userData.IMEI = userDetailsResult.result[0].IMEI
                var userDetailsIMEIResult = await userDaoObject.getUserDetailsByIMEIDao(
                    userData
                );
                console.log("userDetailsResult", userDetailsResult)
                console.log("userDetailsIMEIResult", userDetailsIMEIResult)
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "User Details Loaded Successfully";
                    resp.userDetails = userDetailsResult.result
                    resp.userOtherRelatedDevices = userDetailsIMEIResult.result
                    response.result = resp
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };

    this.sendOTPService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {
                var otp = Math.floor(Math.random() * 900000) + 100000;
                var data = {
                    email: userData.email,
                    subject: "Krypt Admin Login OTP",
                    text: `Your OTP for Krypt Admin Login is : ${otp}`,
                };

                var isSent = await this.sendEmail(data);
                console.log('isSent', isSent)
                userData["otp"] = otp;
                var userDetailsResult = await userDaoObject.saveOTPDao(userData);
                if (userDetailsResult.error == "true" || `${isSent}` != "Sent") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "OTP sent on Email Successfully";
                    response.result = userDetailsResult.result;
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };

    this.verifyOTPService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var resp = {};
            var userDaoObject = new userDao();
            try {
                var userDetailsResult = await userDaoObject.verifyOTPDao(userData);

                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    if (userDetailsResult.result[0].otp == userData.otp) {
                        var auth = {};
                        auth.id = userDetailsResult.result[0].id;
                        auth.email = userDetailsResult.result[0].email;
                        resp.token = await this.generateToken(auth, process.env.JWT_SECRET);
                        response.error = "false";
                        response.message = "Admin Login Successfully";
                        response.result = resp;

                        resolve(response);
                    } else {
                        response.error = "true";
                        response.message = "Invalid OTP";
                        resolve(response);
                    }
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };


    this.resetPasswordService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {
                var password = await this.generatePasswordHashAdmin(userData.password);
                userData.password = password;
                var userDetailsResult = await userDaoObject.resetPasswordDao(
                    userData
                );
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "OOPS Service Error";
                    resolve(response);
                } else {
                    response.error = "false";
                    response.message = "Password reset Successfully";
                    resolve(response);
                }
            } catch (err) {
                err.error = "true";
                err.message = "OOPS Service Error";
                resolve(err);
            }
        });
    };

    this.verifyEmailService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {};
            var userDaoObject = new userDao();
            try {
                var userDetailsResult = await userDaoObject.verifyEmailDao(
                    userData
                );
                if (userDetailsResult.error == "true") {
                    response.error = "true";
                    response.message = "Invalid Email or Email not Registered";
                    resolve(response);
                } else {
                    if (userDetailsResult.result[0].email === userData.email) {
                        response.error = "false";
                        response.message = "Admin Login Details Success";
                        resolve(response);
                    } else {
                        response.error = "true";
                        response.message = "Admin Login Details Failed";
                        resolve(response);
                    }
                }
            } catch (err) {
                err.error = "true";
                err.message = "Invalid Email or Email not Registered";
                resolve(err);
            }
        });
    };
};