import React, {Component} from 'react';

class ChatBar extends Component {

  onSubmit(event){
    event.preventDefault()

    let username = event.target.elements.chatbarUsername.value;
    let message = event.target.elements.chatbarMessage.value;

    this.props.addMessage(username, message);

  }
  render() {
    return (
        <footer className="chatbar">
          <form onSubmit={(event) => this.onSubmit(event)}>
            <input name="chatbarUsername" className="chatbar-username" defaultValue={this.props.currentUser} />
            <input name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER"/>
            <input type="submit" />
          </form>
        </footer>
    );
  }
}

export default ChatBar;