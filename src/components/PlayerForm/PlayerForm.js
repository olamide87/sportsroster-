import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
    name: '',
    imgUrl: '',
    position: '',
  }

  componentDidMount() {
    const { editPlayer } = this.props;
    if (editPlayer.name) {
      this.setState({
        name: editPlayer.name,
        position: editPlayer.position,
        imgUrl: editPlayer.imgUrl,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const previousPlayer = prevProps.editPlayer;
    const incomingPlayer = this.props.editPlayer;

    if (previousPlayer.name !== incomingPlayer.name) {
      this.setState({
        name: incomingPlayer.name || '',
        position: incomingPlayer.position || '',
        imgUrl: incomingPlayer.imgUrl || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeImgEvent = (e) => {
    e.preventDefault();
    this.setState({ imgUrl: e.target.value });
  }

  changePositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  savePlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imgUrl } = this.state;
    const { createPlayer } = this.props;
    const newPlayer = {
      name,
      position,
      imgUrl,
      uid: authData.getUid(),
    };
    createPlayer(newPlayer);
    this.props.closeForm();
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  }

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imgUrl } = this.state;
    const { updatePlayer, editPlayer } = this.props;

    const editedPlayer = {
      name,
      position,
      imgUrl,
      uid: authData.getUid(),
    };
    updatePlayer(editPlayer.id, editedPlayer);
  }

  render() {
    const {
      isEditing,
      name,
      position,
      imgUrl,
    } = this.state;
    return (
      <form className="col-6 offset-3">
      <button className="formBtn btn btn-warning" onClick={this.closeFormEvent}>Close Form</button>
      <div className="form-group">
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          className="form-control"
          id="playerName"
          placeholder="Enter Player Name"
          value={name}
          onChange={this.changeNameEvent}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imgUrl">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="imgUrl"
          placeholder="Enter Image URL"
          value={imgUrl}
          onChange={this.changeImgEvent}
        />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          type="text"
          className="form-control"
          id="position"
          placeholder="Enter Position"
          value={position}
          onChange={this.changePositionEvent}
        />
      </div>
      {
        isEditing
          ? <button className="btn btn-dark mb-2" onClick={this.editPlayerEvent}>Edit Player</button>
          : <button className="btn btn-dark mb-2" onClick={this.savePlayerEvent}>Save Player</button>
      }
    </form>
    );
  }
}

export default PlayerForm;
