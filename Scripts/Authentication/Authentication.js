var AState = require('../Enums/AuthState');
var EStrings = require('../Enums/EventStrings');
var AuthState = AState.AuthState;
var EventStrings = EStrings.EventStrings;
class Authentication{
    constructor(socket){
        console.log("Authentication + constructor")
        this.socket = socket;
        this.state = AuthState.Auth_Pending;
    }
    init(){
        this.socket.on(EventStrings.AuthenticationRequest,this.OnAuthRequest)
        console.log("Authentication + init "+this.state );
    }
    OnAuthRequest(Data)
    {
        this.state = AuthState.Auth_Progress;
        console.log("AuthenticationRequest + Authentication + OnAuthRequest "+this.state + Data['PlayerID']);
        if(Data['PlayerID'] == 0)
        {
            var PlayerID = Math.ceil(Math.random()*100);
            this.socket.emit(EventStrings.AuthenticationResponse,PlayerID);
            console.log("AuthenticationRequest + Authentication + OnAuthRequest "+this.state + Data['PlayerID']);

        }
        else
        {
            var PlayerID = 0;
            this.socket.emit(EventStrings.AuthenticationResponse,PlayerID);
            console.log("AuthenticationRequest + Authentication + OnAuthRequest "+this.state + Data['PlayerID']);

        }
    }
    OnAuthFailed()
    {
        this.state = AuthState.Auth_Failed;
        console.log("Player + OnAuthFailed "+this.state );
    }
    onAuthSuccess()
    {
        this.state = AuthState.Auth_Complete;
        this.state = AuthState.Lobby;
        console.log("Player onAuthSuccess "+this.state);
    }
}
module.exports = {Authentication:Authentication};