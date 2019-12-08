var app = require('express');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var MyPlayer = require('./Scripts/Player/Player.js')
var player = MyPlayer.Player;
//connection
io.on('connection',function(socket){
    console.log("Server Connection Established");
    socket.emit('connection'); // emit connection to tell connection Establised
    var newPlayer = new player(socket); //player creation
    newPlayer.init();
    //socket.emit('connection',{"Id":100});
});

//Server Creation at port 3000
server.listen(3000,"127.0.0.1",function(){
    console.log("Listening")
});
