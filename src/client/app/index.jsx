import React from 'react';
import {render} from 'react-dom';
import HeaderComponent from './components/Header.jsx'
import CardForm from './components/CardForm.jsx'
import fantasy_data from '../data/data';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      cards: [],
    };
    this.state.cards.push({
      kills: 10,
      gpm: 5,
    });
    console.log(this.state.cards);
  }

  render () {
    return (<div className="FantasyApp">
       <HeaderComponent/>
       <CardForm players={Object.keys(fantasy_data)}/>
    </div>);
  }
}

render(<App/>, document.getElementById('app'));