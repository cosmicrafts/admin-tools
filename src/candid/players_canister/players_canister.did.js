export const idlFactory = ({ IDL }) => {
  const PlayerId__1 = IDL.Principal;
  const Wallet = IDL.Record({
    'principal' : IDL.Principal,
    'accountID' : IDL.Text,
    'walletName' : IDL.Text,
  });
  const LinkedWallets = IDL.Vec(Wallet);
  const Level = IDL.Nat;
  const PlayerName = IDL.Text;
  const Player = IDL.Record({
    'id' : PlayerId__1,
    'aid' : IDL.Text,
    'linkedWallets' : LinkedWallets,
    'level' : Level,
    'playerName' : PlayerName,
  });
  const PlayerId = IDL.Principal;
  const GamesPlayed = IDL.Nat;
  const ScoreCC = IDL.Nat;
  const GamesWon = IDL.Nat;
  const Highscore = IDL.Nat;
  const PlayerGameData = IDL.Record({
    'id' : PlayerId__1,
    'gamesPlayed' : GamesPlayed,
    'score' : ScoreCC,
    'gamesWon' : GamesWon,
    'highscore' : Highscore,
  });
  const PlayerPreferences = IDL.Record({
    'gamePlayerData' : IDL.Text,
    'language' : IDL.Nat,
    'playerChar' : IDL.Text,
    'playerCharID' : IDL.Nat,
  });
  const PlayersCanister = IDL.Service({
    'createPlayer' : IDL.Func([Player], [IDL.Bool], []),
    'getAllPlayers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(PlayerId, Player))],
        ['query'],
      ),
    'getPlayer' : IDL.Func([IDL.Principal], [IDL.Opt(Player)], []),
    'getPlayerGameData' : IDL.Func([PlayerId], [IDL.Opt(PlayerGameData)], []),
    'getPlayerPreferences' : IDL.Func(
        [PlayerId],
        [IDL.Opt(PlayerPreferences)],
        [],
      ),
    'savePlayerGameData' : IDL.Func([PlayerId, PlayerGameData], [IDL.Bool], []),
    'savePlayerPreferences' : IDL.Func(
        [PlayerId, PlayerPreferences],
        [IDL.Bool],
        [],
      ),
  });
  return PlayersCanister;
};
export const init = ({ IDL }) => { return []; };
