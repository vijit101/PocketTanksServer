var Auth = require('./../Authentication/Authentication');
class Player
{
    constructor(socket)
    {
        console.log("Player + constructor")
        this.socket = socket;
    }
    init()
    {
        console.log("Player + init");
        var newAuth = new Auth.Authentication(this.socket);
        newAuth.init(); 
    }
    
}
module.exports = {Player:Player};