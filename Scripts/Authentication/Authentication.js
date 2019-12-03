var AState = require('./AuthState');
var AuthState = AState.AuthState;
class Authentication{
    constructor(socket){
        this.socket = socket;
        this.state = AuthState.Auth_Pending;
    }
    init(){
        this.socket.on('AuthenticationRequest',this.OnAuthRequest);
        console.log("Authentication init "+this.state );
        this.socket.emit('connection');
    }
    OnAuthRequest()
    {
        this.state = AuthState.Auth_Progress;
        console.log("Authentication OnAuthRequest "+this.state );
    }
    OnAuthFailed()
    {
        this.state = AuthState.Auth_Failed;
        console.log("Player OnAuthFailed "+this.state );
    }
    onAuthSuccess()
    {
        this.state = AuthState.Auth_Complete;
        console.log("Player onAuthSuccess "+this.state);
    }
}
module.exports = {Authentication:Authentication};