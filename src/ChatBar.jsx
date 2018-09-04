import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super()

  }

  changeableUsername

  render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder={this.props.currentUser} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}

export default ChatBar;