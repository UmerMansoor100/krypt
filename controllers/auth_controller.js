module.exports = function() {
    require('../services/admin_service.js')()
    this.apiServicesAuthCtrl = (request) => {
        return new Promise(function(resolve) {
            try {
                var headers = request.headers
                var role = headers.role
                var id = request.params.auth.id
                // console.log('id',id)
                if (role === 'admin') {
                    this.adminAuthService(id, (result) => {
                        var response = {}
                        if (result.error == 'true') {
                            response.error = "true"
                            response.msg = result.msg
                        } else {
                            response.error = "false"
                            response.msg = result.msg
                            response.data = result.data
                        }
                        resolve(response)
                    })
                } else {
                    var response = {}
                    response.error = "true"
                    response.msg = 'UNAUTHORIZED'
                    resolve(response)
                }
            } catch (err) {
                err.error = "true"
                err.msg = 'OOPS'
                resolve(err)
            }
        })
    }
}