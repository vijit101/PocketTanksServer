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
        this.player2.Enable = true;
        this.ChangeEnableStatus(this.player1.Enable,this.player2.Enable);
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});
        this.OnListentoFireEvt(EventStrings.FireGamePlayData);
        
    }
    ChangeEnableStatus(p1enable,p2enable){
        //console.log("Enabled p1 "+this.player1.Enable+"Enabled p2 "+this.player2.Enable);
        this.player1.Enable = !this.player1.Enable;
        this.player2.Enable = !this.player2.Enable;
        //console.log("Enabled p1 "+this.player1.Enable+"Enabled p2 "+this.player2.Enable);
    }
    BroadcastEmitToPlayers(eventStr,jsonobjp1,jsonobjp2){
        this.player1.socket.emit(eventStr,jsonobjp1);
        this.player2.socket.emit(eventStr,jsonobjp2);
    }

    OnListentoFireEvt(evtString){
        this.player1.socket.on(evtString,(FireDataP1)=>{
        this.ChangeEnableStatus(this.player1.Enable,this.player2.Enable);
        console.log("FireDataP1 "+FireDataP1['powerSlider']+" " + FireDataP1['playerHealth1']);
        this.player2.socket.emit(EventStrings.FireFromPlayer1,{"powerSlider":FireDataP1['powerSlider'],"angleSlider":FireDataP1['angleSlider'],"playerHealth1":FireDataP1['playerHealth1'],"playerHealth2":FireDataP1['playerHealth2']});
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});})
        this.player2.socket.on(evtString,(FireDataP2)=>{
        this.ChangeEnableStatus(this.player1.Enable,this.player2.Enable);
        console.log("FireDataP2 "+FireDataP2['powerSlider']);
        this.player1.socket.emit(EventStrings.FireFromPlayer2,{"powerSlider":FireDataP2['powerSlider'],"angleSlider":FireDataP2['angleSlider'],"playerHealth1":FireDataP2['playerHealth1'],"playerHealth2":FireDataP2['playerHealth2']});
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});})
    }
}
module.exports = {GamePlay:GamePlay};