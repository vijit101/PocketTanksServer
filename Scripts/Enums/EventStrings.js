const EventStrings = {
    AuthenticationRequest : "AuthenticationRequest",
    AuthenticationResponse : "AuthenticationResponse",
    AuthenticationSuccess : "AuthenticationSuccess",
    StartMatchMaking:"StartMatchMaking",
    StartGamePlay : "StartGamePlay",
    OnGameSetup : "OnGameSetup",
    OnDisablePlayer : "OnDisablePlayer",
    OnEnablePlayer : "OnEnablePlayer",
    FireGamePlayData : "FireGamePlayData",
    FireFromPlayer1 :"FireFromPlayer1",
    FireFromPlayer2 : "FireFromPlayer2",
    EmitHealthData : "EmitHealthData",
    PlayerPriorityServer : "PlayerPriorityServer",
    HealthFromP1 :"HealthFromP1",
    HealthFromP2 :"HealthFromP2",
}
module.exports = {EventStrings:EventStrings};

// this was kept as a mirror of event strings used in the unity frontend , as i faced problems to always wrtie correct spellings for the events this way it was fast to reuse certain events without bothering to match it up to the unity logics 
