import React from 'react';
import PropTypes from 'prop-types';

import playerData from '../../helpers/data/playerData';
import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  }

  state = {
    players: [],
    formOpen: false,
  }

  updatePlayers = () => {
    const { uid } = this.props;
    playerData.getPlayersByUid(uid)
      .then((players) => this.setState({ players }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.updatePlayers();
  }

  deletePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => {
        this.updatePlayers();
      })
      .catch((err) => console.error('Delete player failed', err));
  }

  createPlayer = (newPlayer) => {
    playerData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create Player Broke', err));
  }

  render() {
    const { players, formOpen } = this.state;
    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} />);

    return (
      <div>
        <h1>Tennessee Titans</h1>
        <div className="rosterContainer">
          {playerCard}
        </div>
      </div>
    );
  }
}

export default Team;
