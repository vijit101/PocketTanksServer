var app = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection',function(socket){
    console.log("Server Connection Established");
    socket.emit('connection');
});

server.listen(3000,"127.0.0.1",function(){
    console.log("Listening")
});
