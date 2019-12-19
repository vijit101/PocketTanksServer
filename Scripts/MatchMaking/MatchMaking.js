var MyPlayer = require('../Player/Player');
var player = MyPlayer.Player;
var EStrings = require('../Enums/EventStrings');
var GamePlay = require('./GamePlay').GamePlay;

var MatchMakingInstance = (function () {
    var instance;
 
    function createInstance() {
        var object = new MatchMaking();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class MatchMaking
{
    constructor()
    {
        console.log("MatchMaking + StartMatchMaking");
        this.playerQueue = {};
    }
    AddPlayerToQueue(myplayer){
        console.log("MatchMaking + AddPlayerToQueue");
        if(this.playerQueue[0]==null)
        {
            this.playerQueue[0] = myplayer;
            console.log("MatchMaking + AddedPlayerToQueue");

        }
        else
        {
            console.log("MatchMaking + GamePlayCase");
            var gamePlay = new GamePlay(this.playerQueue[0],myplayer);
            this.playerQueue[0] = null;
            gamePlay.init();
        }
    }
}
module.exports = {MatchMakingInstance:MatchMakingInstance}