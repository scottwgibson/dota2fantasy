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

  calcAverage ( card, data )
  {
    const total = data.reduce((total, match) => {
        Object.keys(match.fantasy_data).map((key, i) => {
        total[key] = (total[key] || 0) + match.fantasy_data[key];
        })
        return total;
    }, {});

      const average = Object.keys(total).reduce((average, key)=>{
         average[key] = total[key] / data.length;
          return average;
      }, {});
        
      return average;
  } 

  calcScore ( card, averages )
  {
      return Object.keys(averages).reduce((score, key) => {
        score[key] = ( key === "deaths") ?
           3 - score[key] * averages[key] : 
           score[key] * averages[key];
        score[key] = score[key] + (score[key] * (card[key] / 100 ))
        return score;
      }, {
        kills: 0.3,
        deaths: 0.3,
        creep_score: 0.003,
        gpm: 0.002,
        towers_killed: 1,
        roshans_killed: 1,
        teamfight_participation: 3,
        obs_placed: 0.5,
        creeps_stacked: 0.5,
        rune_pickups: 0.25,
        firstblood_claimed: 4,
        stuns: 0.05
      });
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

    const defaults = Object.keys(PLAYERS_DATA).filter(i=> i !== "87196890").map(i => { 
      const averages = this.calcAverage(card, FANTASY_DATA[i]);
      const score = this.calcScore(card, averages);
      const total_score = Object.keys(score).reduce((total, i) => total + score[i], 0);
      return {
        player: PLAYERS_DATA[i],
        data: FANTASY_DATA[i],
        card: card,
        averages: averages,
        score: score,
        total_score: total_score
        }
      });
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