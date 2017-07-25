import React from 'react';

class CardForm extends React.Component {
    constructor (){
        super();
        this.state = {
            kills: 0,
            deaths: 0,
            last_hits: 0,
            denies: 0,
            gold_per_min: 0,
            towers_killed: 0,
            roshans_killed: 0,
            teamfight_participation: 0,
            obs_placed: 0,
            creeps_stacked: 0,
            rune_pickups: 0,
            firstblood_claimed: 0,
            stuns: 0
        };
    }

    render () {
        return <div className="CardForm">
            <form>
                <select>
                    {this.props.players.map(player => <option>{player}</option>)}
                </select>
                {Object.keys(this.state).map(key =>
                    <div><p>{key}</p><input type="number" min="0" max="25" step="5"/></div>)}
            </form>
            </div>;
    }
}

export default CardForm