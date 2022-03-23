module.exports = function() {
    const Localize = require('localize')
    const error = require('./../utils/errorMsg.js')
    var paramsErrorMsg = new Localize(error.PARAM_ERROR)
    var ctrlErrorMsg = new Localize(error.ERROR)
    var ctrlSuccessMsg = new Localize(error.SUCCESS)

    this.requestHandler = (error, status, lang, callback) => {
        try {
            paramsErrorMsg.setLocale(lang)
            var message = {}
            var errorMessage = error[0].msg
            var msg = errorMessage.split(',')
            message.error = status
            message.message = paramsErrorMsg.translate(msg[0], msg[1], msg[2], msg[3])
        } catch (err) {
            message.error = true
            message.message = 'Oops something went wrong'
        }
        callback(message)
    }
    this.ctrlHandler = (error, status, lang, callback) => {
        var message = {}
        var errorMessage = error[0].message
        if (status === 'true') {
            var msg = errorMessage.split(',')
            try {
                ctrlErrorMsg.setLocale(lang)
                message.error = status
                message.message = ctrlErrorMsg.translate(msg[0], msg[1], msg[2], msg[3])
                message.data = error[0].data
            } catch (err) {
                message.error = status
                message.message = 'Language type "' + lang + '" is not supported'
            }
        } else {
            var msg = errorMessage.split(',')
            try {
                ctrlSuccessMsg.setLocale(lang)
                message.error = status
                message.message = ctrlSuccessMsg.translate(msg[0], msg[1], msg[2], msg[3])
                message.data = error[0].data
            } catch (err) {
                message.error = status
                message.message = 'Language type "' + lang + '" is not supported'
            }
        }
        callback(message)
    }
}