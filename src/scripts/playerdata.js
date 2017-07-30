
var fetch = require('node-fetch');

var international_teams = [
  2586976,
  1883502,
  39,
  2163,
  5,
  1375614,
  1838315,
  4593831,
  46,
  2640025,
  3331948,
  15,
  2108395,
  350190,
  2581813,
  3214108,
  2512249,
  2672298
];

function getProPlayers ( teams )
{
    return fetch("https://api.opendota.com/api/proPlayers")
    .then(resp => resp.json())
    .then(data => data
          .filter(x => teams.includes(x.team_id) && x.is_locked)
    );
}


async function main ( )
{
    const players = await getProPlayers(international_teams)
    
    const temp = players.reduce((players, player) => {
        players[player.account_id] = player;
        return players;
    }, {});

    console.log(JSON.stringify(temp));
}
main();