module.exports = function(app, validator) {
    require('../utils/error.js')()
    var socketController = require('../controllers/socket_controller.js')
    var socket = app.io

    //socket connections

    socket.on('connection', function(socket) {
        var socketControllerObject = new socketController()
        // console.log('connection', socket.id)

        socket.on('updateOnline', function(data) {
            // console.log('updateOnline', data);
            data.socketId = socket.id
            socketControllerObject.updateOnlineController(data, function(message) {
                var emitter = 'online_' + data.userName
                // console.log('emitter', emitter)
                socket.broadcast.emit(emitter, { userName: data.userName, lastLoginTime: message.data.lastLoginTime, isOnline: 1 });
            })
        });

        socket.on('updateOffline', function(data) {
            // console.log('updateOffline', data);
            data.socketId = socket.id
            socketControllerObject.updateOfflineController(data, function(message) {
                var emitter = 'offline_' + data.userName
                // console.log('emitter', emitter)
                socket.broadcast.emit(emitter, { userName: data.userName, lastLoginTime: message.data.lastLoginTime, isOnline: 0 });
            })
        });


        socket.on('disconnect', function(data) {
            // console.log('disconnect', data, 'scoket id', socket.id);
            var socketId = socket.id
            socketControllerObject.updateDisconnectController(socketId, function(message) {
                // console.log("message", message)
                var emitter = 'offline_' + message.userName
                // console.log('emitter', emitter)
                socket.broadcast.emit(emitter, { userName: message.data[0].userName.toUpperCase(), lastLoginTime: message.data[0].lastLoginTime, isOnline: 0 });
            })
        });
    });
}