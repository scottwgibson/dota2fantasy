import React from 'react';
import {render} from 'react-dom';
import HeaderComponent from './components/Header.jsx'

class App extends React.Component {
  render () {
    return <div className="FantasyApp">
       <HeaderComponent/>
       <ul>
         <li>Hello</li>
         <li>React</li>
         <li>What</li>
         <li>To</li>
         <li>Do</li>
        </ul>

    </div>;
  }
}

render(<App/>, document.getElementById('app'));