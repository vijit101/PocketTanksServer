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
        console.log("GamePlay + JoinedRoom");

    }    
}
module.exports = {GamePlay:GamePlay};