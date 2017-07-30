var players = require('../client/data/players.json');

var fetch = require('node-fetch');
var PromiseThrottle = require('promise-throttle');

function getFantasyData ( match_id )
{

    console.log("Fetching: ", match_id);
    return fetch("https://api.opendota.com/api/matches/" + match_id)
        .then(resp => resp.json())
        .then(function(data) {
            if ( data.players[0].teamfight_participation === null )
            {
                return {};
            }
            else
            {
            return data.players.map(player => {
                return {
                    account_id: player.account_id,
                    series_id: data.series_id,
                    match_id: match_id,
                    league_id: data.leagueid,
                    win: player.win,
                    fantasy_data: {
                        kills: player.kills,
                        deaths: player.deaths,
                        creep_score: player.last_hits + player.denies,
                        gpm: player.gold_per_min,
                        towers_killed: player.towers_killed,
                        roshans_killed: player.roshans_killed,
                        teamfight_participation: player.teamfight_participation,
                        obs_placed: player.obs_placed,
                        creeps_stacked: player.creeps_stacked,
                        rune_pickups: player.rune_pickups,
                        firstblood_claimed: player.firstblood_claimed,
                        stuns: player.stuns
                    }
                };
            }).filter(x => x.league_id && x.series_id && ( data.radiant_score || data.dire_score) && x.fantasy_data.teamfight_participation !== null);
        }});
}

function getRecentProGames ( player_id )
{
    return fetch("https://api.opendota.com/api/players/" + player_id + "/matches?game_mode=2&date=100")
        .then((resp) => resp.json())
        .then(data => data.map(x => x.match_id));
}

var promiseThrottle = new PromiseThrottle({
    requestsPerSecond: 1,           // up to 1 request per second
    promiseImplementation: Promise  // the Promise library you are using
});

async function main() {
  const match_ids = await Promise.all(Object.keys(players).map(id => promiseThrottle.add(getRecentProGames.bind(null, id))));
  const uniq_match_ids = match_ids.concat.apply([], match_ids)
                            .filter((item, pos, arr) => arr.indexOf(item) == pos);
  console.log(uniq_match_ids);
                            
  const fantasy_data = await Promise.all(uniq_match_ids.map(id => promiseThrottle.add(getFantasyData.bind(null, id))));

  const final_data = fantasy_data.concat.apply([], fantasy_data)
    .filter(x=> x.account_id in players)
    .reduce((data, x) => {
        data[x.account_id] = data[x.account_id] || [];
        //console.log(x);
        //let series_id = x.series_id;
        data[x.account_id].push(x);

        return data;
    }, {});
  console.log(JSON.stringify(final_data));
}
main();

