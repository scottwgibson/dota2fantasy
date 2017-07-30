import '../react-tap-event';

import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderComponent from './components/Header';
import CardTable from './components/CardTable';

let FANTASY_DATA = null
let PLAYERS_DATA = null;
let TEAM_DATA = null;

class App extends Component {
  state = {
    loading: false,
    cards: []
  };

  calcScore ( card, data )
  {
    if ( data )
    {
      //console.log(data[0].account_id);
      const total = data.reduce((total, match) => {
          Object.keys(total).map((key, i) => {
            total[key]+= match.fantasy_data[key];
          })
          return total;
      }, {
        kills: 0,
        deaths: 0,
        creep_score: 0,
        gpm: 0,
        towers_killed: 0,
        roshans_killed: 0,
        teamfight_participation: 0,
        obs_placed: 0,
        creeps_stacked: 0,
        rune_pickups: 0,
        firstblood_claimed: 0,
        stuns: 0});

        const average = Object.keys(total).reduce((average, key)=>{
            average[key] = total[key] / data.length;
            return average;
        }, {});
        
        return average;
    }

  } 

  addDefaults ( )
  {
    const card = {
        kills: 0,
        deaths: 0,
        creep_score: 0,
        gpm: 0,
        towers_killed: 0,
        roshans_killed: 0,
        teamfight_participation: 0,
        obs_placed: 0,
        creeps_stacked: 0,
        rune_pickups: 0,
        firstblood_claimed: 0,
        stuns: 0
    };

    const defaults = Object.keys(PLAYERS_DATA).map(i => { return {
      player: PLAYERS_DATA[i],
      data: FANTASY_DATA[i],
      card: card,
      score: this.calcScore(card, FANTASY_DATA[i])
    }}).filter(x => x.data);
    this.setState({cards: defaults})
  }

  componentWillMount() {
    if (!FANTASY_DATA || !PLAYERS_DATA || !TEAM_DATA) {
      this.setState({
        loading: true
      })
      Promise.all([
        import('../data/fantasy_data.json'),
        import('../data/players.json'),
        import('../data/team_data.json')
      ])
      .then(([ data, players_data, team_data ]) => {
        FANTASY_DATA = data;
        PLAYERS_DATA = players_data;
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
        <CardTable
          loading={this.state.loading}
          cards={this.state.cards}
          players={PLAYERS_DATA}
          teams={TEAM_DATA}
      />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));