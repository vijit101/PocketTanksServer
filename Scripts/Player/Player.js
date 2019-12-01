const PlayerState = {
    Auth_Pending : "Auth_Pending",
    Auth_Progress : "Auth_Progress",
    Auth_Complete : "Auth_Complete",
    Auth_Failed : "Auth_Failed",
    Lobby : "Lobby",
    GamePlay : "GamePlay"

}
class Player
{
    constructor(socket)
    {
        this.socket = socket;
        this.state = PlayerState.Auth_Pending;
    }
    init()
    {
        this.socket.on('AuthenticationRequest',this.OnAuthRequest);
        console.log("Player init "+this.state );
        this.socket.emit('connection');
    }
    OnAuthRequest()
    {
        this.state = PlayerState.Auth_Progress;
        console.log("Player OnAuthRequest "+this.state );
    }
    OnAuthFailed()
    {
        this.state = PlayerState.Auth_Failed;
        console.log("Player OnAuthFailed "+this.state );
    }
    onAuthSuccess()
    {
        this.state = PlayerState.Auth_Complete;
        console.log("Player onAuthSuccess "+this.state);
    }
}
module.exports = {Player:Player};