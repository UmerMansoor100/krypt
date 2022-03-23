const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const multer = require('multer')
var helmet = require('helmet')
var morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const { check, validationResult } = require('express-validator')
    //add certificate and private key.
var privateKey = fs.readFileSync('private.key', 'utf8');
var certificate = fs.readFileSync('1krypt.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

const https = require('https').Server(credentials, app)
var socketio = require('socket.io')
    // create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    // setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('Method - :method URL - :url Response-Time - :response-time', { stream: accessLogStream }))

/*server configuration*/
var whitelist = [process.env.DEV_DOMAIN, process.env.LIVE_DOMAIN]
app.use(helmet())
app.use(helmet.xssFilter())
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())
app.use(cors())
app.use('/', express.static(path.join(__dirname, '../../../../var/www/html/uploads')))
app.io = socketio.listen(https, { 'pingInterval': 2000, 'pingTimeout': 5000 })
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
app.disable("x-powered-by")

app.use('/', function(request, response, next) {
    request.headers.lang = request.headers.lang || 'default'
    console.log('Method: ' + request.method + ' Route: ' + request.originalUrl + ' Body: ' + JSON.stringify(request.body))
    next()
})

// function handleRedirect(req, res) {
//     app.use('/', express.static(path.join(__dirname, process.env.TARGET_ADMIN)))
//     res.redirect(process.env.TARGET_BASE_URL);
// }
// app.get('admin', handleRedirect);

//Auth Controller
require('./controllers/auth_controller.js')()


async function auth(request, response, next) {
    var error = {}
    try {
        var authorization = request.headers.authorization //Buffer.from(request.headers.authorization, 'base64').toString()
        var auth = await this.getPayloadFromToken(authorization, process.env.JWT_SECRET)
        if (auth.error == 'true') {
            error.error = "true"
            error.message = "UNAUTHORIZED"
            return response.status(401).send(error)
        } else {
            request.params.auth = auth.data
            var authenticate = await this.apiServicesAuthCtrl(request)
            if (authenticate.error == 'true') {
                error.error = "true"
                error.message = "UNAUTHORIZED"
                return response.status(401).send(error)
            } else {
                next()
            }
        }
    } catch (err) {
        err.error = "true"
        err.message = "UNAUTHORIZED"
        return response.status(401).send(err)
    }
}

//cors controller
async function corsOptionsDelegate(req, response, next) {
    // var token = req.headers['x-access-token'];
    // console.log(token)
    var error = {}
    try {
        if (whitelist.indexOf(req.headers.host) !== -1) {
            next() // disable CORS for this request
        } else {
            error.error = "true"
            error.message = "UNAUTHORIZED CORS"
            return response.status(200).send(error)
        }
    } catch (err) {
        err.error = "true"
        err.message = "UNAUTHORIZED CORS"
        return response.status(200).send(err)
    }
}

app.auth = auth
app.cors = corsOptionsDelegate


const validator = {}
validator.check = check
validator.validation = validationResult

require('./routes/socket_routes.js')(app, validator)
require('./routes/account_routes.js')(app, validator)
require('./routes/group_routes.js')(app, validator)
require('./routes/admin_routes.js')(app, validator)
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
https.listen(process.env.PORT, function() {
    console.log('Server is running on https://' + process.env.HOST + ':' + process.env.PORT)
})
