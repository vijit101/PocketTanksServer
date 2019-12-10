var AState = require('../Enums/AuthState');
var EStrings = require('../Enums/EventStrings');
var AuthState = AState.AuthState;
var EventStrings = EStrings.EventStrings;
class Authentication{
    constructor(socket){
        console.log("Authentication + constructor")
        this.socket = socket;
        this.state = AuthState.Auth_Pending;
        this.PlayerID = null;
    }
    init(){
        this.socket.on(EventStrings.AuthenticationRequest,(Data)=>{
            this.state = AuthState.Auth_Progress;
            console.log("AuthenticationRequest + Authentication + OnAuthRequest "+this.state + Data['PlayerID']);
            if(Data['PlayerID'] == 0)
            {
                console.log("check from onAuth")
                this.PlayerID = Data['PlayerID'];
                this.socket.emit(EventStrings.AuthenticationResponse)
            }
            else
            {
                this.PlayerID = Math.ceil(Math.random()*100);
                this.socket.emit(EventStrings.AuthenticationResponse)
            }
        })
        console.log("Authentication + init "+this.state );
    }
    OnAuthRequest(Data)
    {
        this.state = AuthState.Auth_Progress;
        console.log("AuthenticationRequest + Authentication + OnAuthRequest "+this.state + Data['PlayerID']);
        if(Data['PlayerID'] == 0)
        {
            console.log("check from onAuth")
            this.PlayerID = Data['PlayerID'];
            this.socket.emit(EventStrings.AuthenticationResponse)
        }
        else
        {
            this.PlayerID = Math.ceil(Math.random()*100);
            this.socket.emit(EventStrings.AuthenticationResponse)
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