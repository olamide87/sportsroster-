/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Auth from '../Auth/Auth';
import './MyNavbar.scss';

class Navbar extends React.Component {
  render() {
    const { authed } = this.props;

    return (
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#"><img src="https://i.pinimg.com/originals/d3/bd/b3/d3bdb38c4c433e694d58f919faa65be4.gif" width="100" height="75" alt="Average Joe's"></img></a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Auth authed={authed}/></li>
          </ul>
        </nav>
    );
  }
}

export default Navbar;
