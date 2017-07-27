import '../react-tap-event';

import React, { Component } from 'react';
import { render } from 'react-dom';
import HeaderComponent from './components/Header';
import TeamList from './components/TeamList';

let DATA = null
let PLAYERS_DATA = null;
let TEAM_DATA = null;

class App extends Component {
  state = {
    loading: false
  };

  componentWillMount() {
    if (!DATA || !PLAYERS_DATA || !TEAM_DATA) {
      this.setState({
        loading: true
      })
      Promise.all([
        import('../data/data.json'),
        import('../data/players_data.json'),
        import('../data/team_data.json')
      ])
      .then(([ data, players_data, team_data ]) => {
        DATA = data;
        PLAYERS_DATA = players_data.reduce((acc, x) => {
          acc[x.account_id] = x;
          return acc
        }, {});
        TEAM_DATA = team_data.reduce((acc, x) => {
          acc[x.team_id] = x;
          return acc
        }, {});
        this.setState({ loading: false })
      });
    }
  }

  render() {
    return <div className="FantasyApp">
      <HeaderComponent/>
        <TeamList
          loading={this.state.loading}
          players={DATA}
          players_data={PLAYERS_DATA}
          team_data={TEAM_DATA}
        />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));