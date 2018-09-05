import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser
    }
    this.onContent = this.onContent.bind(this);
  }

  onContent(event) {
    this.setState({
      username: event.target.value
    });
  }

  onSubmitMessage(event){
    event.preventDefault()
    let type = "incomingMessage"
    let message = event.target.elements.chatbarMessage.value;

    this.props.addMessage(this.state.currentUser, message, type);
    event.target.elements.chatbarMessage.value = ''
  }

  onSubmitUsername(event){
    event.preventDefault()
    let type = "notification";

    this.props.addMessage(
      this.props.currentUser, 
      `${this.props.currentUser} changed their username to ${this.state.username}`, 
      type
    )
    this.setState({currentUser: this.state.username})
  }

  render() {
    return (
        <footer className="chatbar">
          <form onSubmit={(event) => this.onSubmitUsername(event)}>
          <input onChange={ this.onContent } name="chatbarUsername" className="chatbar-username" defaultValue={this.props.currentUser} />
            <input type="submit" />
          </form>
          <form onSubmit={(event) => this.onSubmitMessage(event)}>
            <input name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER"/>
            <input type="submit" />
          </form>
        </footer>
    );
  }
}

export default ChatBar;