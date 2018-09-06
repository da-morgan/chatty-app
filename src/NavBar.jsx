import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Prop NumUsers",this.props.numUsers)
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>Currently {this.props.numUsers} users online</span>
        </nav>
    );
  }
}

export default NavBar;