import React, {Component} from 'react';

class NavBar extends Component {

  /* Ternary checks to see how many users to pluralize user or not. */
  render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>
            Currently {this.props.numUsers} {(this.props.numUsers === 1) ? 'user' : 'users'} online
          </span>
        </nav>
    );
  }
}

export default NavBar;