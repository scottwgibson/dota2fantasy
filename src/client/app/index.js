import '../react-tap-event';

import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderComponent from './components/Header';
import TeamList from './components/TeamList';
import CardList from './components/CardList';

let FANTASY_DATA = null
let PLAYERS_DATA = null;
let TEAM_DATA = null;

class App extends Component {
  state = {
    loading: false,
    cards: []
  };

  calculateScore ( card, data )
  {
    const matches = Object.keys(data.series).reduce((matches, series_id) =>
        matches.concat(data.series[series_id])
      , []);

    return matches.reduce((total, match) => {
        return total +
          match.kills * 0.3 +
          match.deaths * 0.3 +
          match.last_hits * 0.003 +
          match.denies * 0.003 +
          match.gold_per_min * 0.002 +
          match.towers_killed * 1 +
          match.roshans_killed * 1 +
          match.teamfight_participation * 3 +
          match.obs_placed * 0.5 +
          match.creeps_stacked * 0.5 +
          match.rune_pickups * 0.25 +
          match.firstblood_claimed * 4 +
          match.stuns * 0.05;
    }, 0) / matches.length;
  }

  addDefaults ( )
  {
    const defaults = Object.keys(FANTASY_DATA).map(i => { return {
      account_id : FANTASY_DATA[i].account_id,
      score : this.calculateScore(null, FANTASY_DATA[i])
    }});
    this.setState({cards: defaults})
  }

  componentWillMount() {
    if (!FANTASY_DATA || !PLAYERS_DATA || !TEAM_DATA) {
      this.setState({
        loading: true
      })
      Promise.all([
        import('../data/data.json'),
        import('../data/players_data.json'),
        import('../data/team_data.json')
      ])
      .then(([ data, players_data, team_data ]) => {
        FANTASY_DATA = data;
        PLAYERS_DATA = players_data.reduce((acc, x) => {
          acc[x.account_id] = x;
          return acc
        }, {});
        TEAM_DATA = team_data.reduce((acc, x) => {
          acc[x.team_id] = x;
          return acc
        }, {});
        this.addDefaults();
        this.setState({ loading: false })
      });
    }
  }

  render() {
    return <div className="FantasyApp">
      <HeaderComponent/>
      <CardList
        loading={this.state.loading}
        cards={this.state.cards}
        players_data={PLAYERS_DATA}
      />
      <TeamList
        loading={this.state.loading}
        players={FANTASY_DATA}
        players_data={PLAYERS_DATA}
        team_data={TEAM_DATA}
      />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));