import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/props/teamShape';
import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;
    deletePlayer(player.id);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card">
        <img className="card-img-top player-image" src={player.imageUrl} alt={player.name}></img>
        <div className="card-body">
          <h5 className="card-title">{player.name}</h5>
          <p className="card-text">{player.position}</p>
        </div>
        <div className="card-footer">
          <i className="fas fa-trash-alt" onClick={this.deletePlayerEvent}></i>
          <i className="fas fa-edit"></i>
        </div>
      </div>
    );
  }
}

export default Player;
