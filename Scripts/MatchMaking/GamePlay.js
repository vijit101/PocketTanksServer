var EventStrings = require('../Enums/EventStrings').EventStrings;
class GamePlay
{
    constructor(player1,player2){
        console.log("GamePlay + constructor");
        this.player1 = player1;
        this.player2 = player2;
    }
    init()
    {
        console.log("GamePlay + init");
        var roomId = Math.ceil(Math.random()*100+1);
        this.player1.socket.join(roomId);
        this.player2.socket.join(roomId);
        console.log("GamePlay + JoinedRoom "+roomId);
        //this.player1.socket.emit(EventStrings.StartGamePlay);
        //this.player2.socket.emit(EventStrings.StartGamePlay);
        console.log("GamePlay + emit "+EventStrings.StartGamePlay);
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay);
        
    }
    BroadcastEmitToPlayers(eventStr){
        this.player1.socket.emit(eventStr,{"Enable":true});
        this.player2.socket.emit(eventStr,{"Enable":false});
    }        
}
module.exports = {GamePlay:GamePlay};