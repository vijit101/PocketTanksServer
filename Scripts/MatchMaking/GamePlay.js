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
        console.log("GamePlay + emit "+EventStrings.StartGamePlay);
        this.player2.Enable = true;
        this.ChangeEnableStatus(this.player1.Enable,this.player2.Enable);
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});
        this.OnListentoFireEvt(EventStrings.FireGamePlayData);
        this.OnListenToHealthEvent(EventStrings.EmitHealthData);
        //this.OnListenToDeathEvent(EventStrings.OnDeath);
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
        console.log("FireDataP1 "+FireDataP1['powerSlider']);
        this.player2.socket.emit(EventStrings.FireFromPlayer1,{"powerSlider":FireDataP1['powerSlider'],"angleSlider":FireDataP1['angleSlider']});
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});})
        this.player2.socket.on(evtString,(FireDataP2)=>{
        this.ChangeEnableStatus(this.player1.Enable,this.player2.Enable);
        console.log("FireDataP2 "+FireDataP2['powerSlider']);
        this.player1.socket.emit(EventStrings.FireFromPlayer2,{"powerSlider":FireDataP2['powerSlider'],"angleSlider":FireDataP2['angleSlider']});
        this.BroadcastEmitToPlayers(EventStrings.StartGamePlay,{"Enable":this.player1.Enable},{"Enable":this.player2.Enable});})
    }

    OnListenToHealthEvent(evtString){
        this.player1.socket.on(evtString,(HealthDataP1)=>{
            console.log("P1 HealthDataP1 "+HealthDataP1['playerHealth1']+" Player2"+HealthDataP1['playerHealth2']);
            this.player1.socket.emit(EventStrings.HealthFromP1,HealthDataP1);
        });
        this.player2.socket.on(evtString,(HealthDataP2)=>{
            console.log("P2 HealthDataP1 "+HealthDataP2['playerHealth1']+" Player2"+HealthDataP2['playerHealth2']);
            this.player2.socket.emit(EventStrings.HealthFromP2,HealthDataP2);
        });
    }

    OnListenToDeathEvent(evtString){
        this.player1.socket.on(evtString,(playerDeathData1)=>{
            console.log("1"+playerDeathData1['playerDead']);
            this.player1.socket.emit(EventStrings.GameOver,playerDeathData1);
        });
        this.player2.socket.on(evtString,(playerDeathData2)=>{
            console.log("2"+playerDeathData2['playerDead']);
            this.player2.socket.emit(EventStrings.GameOver,playerDeathData2);
        });
    }
}
module.exports = {GamePlay:GamePlay};