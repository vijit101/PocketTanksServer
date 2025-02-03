const AuthState = {
    Auth_Pending : "Auth_Pending",
    Auth_Progress : "Auth_Progress",
    Auth_Complete : "Auth_Complete",
    Auth_Failed : "Auth_Failed",
    Lobby : "Lobby",
    GamePlay : "GamePlay"

}
module.exports = {AuthState:AuthState};

// implemented enums to manage the pseudo state machine used and it also saves me time writing the strigns again and again apart from it makes it more reliable for my team mate to read it 
