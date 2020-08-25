import React from 'react';
import firebase from 'firebase/app';
import authData from '../helpers/data/authData';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Team from '../components/Team/Team';

import './App.scss';
import 'firebase/auth';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({ authed: true }) : this.setState({ authed: false });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    const loadComponent = () => {
      if (authed) {
        const uid = authData.getUid();
        return <Team uid={uid}/>;
      }

      return (
        <h2 className="text-center">Please login to view roster</h2>
      );
    };

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
