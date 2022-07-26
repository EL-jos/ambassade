let socketio = require('socket.io');
 
module.exports.listen = (server) => {
    io = socketio.listen(server);
 
    io.once('connection', function(socket){
        socket.on('message-client', (data) => {console.log(data);
        });
        console.log("Controller Socket: ", socket.id);
    });
 
    return io;
}