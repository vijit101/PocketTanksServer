var Auth = require('./../Authentication/Authentication');
var EStrings = require('../Enums/EventStrings');
var MatchMakingInstance = require('./../MatchMaking/MatchMaking').MatchMakingInstance;
var EventStrings = EStrings.EventStrings;
class Player
{
    constructor(socket)
    {
        console.log("Player + constructor")
        this.socket = socket;
        
    }
    init()
    {

        this.socket.on(EventStrings.StartMatchMaking,()=>{
            console.log("Player + StartMatchMaking");
            this.BeginMatchMaking();

        });
        var newAuth = new Auth.Authentication(this.socket); 
        newAuth.init(); 
        
    }

    BeginMatchMaking(){
        MatchMakingInstance.getInstance().AddPlayerToQueue(this);
    }
    
}
module.exports = {Player:Player};