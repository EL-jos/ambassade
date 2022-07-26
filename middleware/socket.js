

module.exports= (req,res, next) => {
 
    var io = req.app.get('socketio');
    io.sockets.once('connection', socket => {

        console.log("Middlewares Socket: ", socket.id);
    })
 
    next()
}