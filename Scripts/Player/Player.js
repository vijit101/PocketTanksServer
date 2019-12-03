var Auth = require('./../Authentication/Authentication');
class Player
{
    constructor(socket)
    {
        this.socket = socket;
    }
    init()
    {
        console.log("Player init "+this.state );
        var newAuth = new Auth.Authentication(this.socket);
        newAuth.init(); 
    }
    
}
module.exports = {Player:Player};