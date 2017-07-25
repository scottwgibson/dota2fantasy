import React from 'react';
import {render} from 'react-dom';
import HeaderComponent from './components/Header.jsx'
import PlayerList from './components/PlayerList.jsx'
import fantasy_data from '../data/data';

class App extends React.Component {
  render () {
    return <div className="FantasyApp">
       <HeaderComponent/>
       <PlayerList players={fantasy_data}/>
    </div>;
  }
}

render(<App/>, document.getElementById('app'));