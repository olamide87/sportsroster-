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
    editPlayer: {},
  }

  getPlayers = () => {
    const { uid } = this.props;
    playerData.getPlayersByUid(uid)
      .then((players) => this.setState({ players }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getPlayers();
  }

  deletePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => {
        this.getPlayers();
      })
      .catch((err) => console.error('Delete player failed', err));
  }

  createPlayer = (newPlayer) => {
    playerData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState();
      })
      .catch((err) => console.error('Create player failed', err));
  }

  editAPlayer = (playerToEdit) => {
    this.setState({ formOpen: true, editPlayer: playerToEdit });
  }

  updatePlayer = (playerId, editedPlayer) => {
    playerData.editPlayer(playerId, editedPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false, editPlayer: {} });
      })
      .catch((err) => console.error(err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { players, formOpen, editPlayer } = this.state;
    const playerCard = players.map((player) => <Player key={player.id} player={player} deletePlayer={this.deletePlayer} editAPlayer={this.editAPlayer}/>);

    return (
      <div>
        <h1>Tennessee Titans</h1>
        { !formOpen ? <button className="newPlayer btn btn-warning mb-2" onClick={() => { this.setState({ formOpen: true, editPlayer: {} }); }}>Create New Player</button> : '' }
        { formOpen ? <PlayerForm createPlayer={this.createPlayer} editPlayer={editPlayer} updatePlayer={this.updatePlayer} closeForm={this.closeForm}/> : '' }
        <div className="rosterContainer">
          {playerCard}
        </div>
      </div>
    );
  }
}

export default Team;
