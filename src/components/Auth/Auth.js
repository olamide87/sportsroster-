import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const loginButton = authed
      ? <button className="btn btn-danger logState" onClick={this.loginClickEvent}>Logout <i className="fas a-sighn-out-alt"></i></button>
      : <button className="btn btn-danger logState" onClick={this.loginClickEvent}><i className="fab fa-google"></i> Login </button>;

    return (
      <div className="Auth">
        {loginButton}
      </div>
    );
  }
}

export default Auth;
