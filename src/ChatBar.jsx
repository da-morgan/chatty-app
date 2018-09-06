import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser
    }
    this.onUserChange = this.onUserChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.submitUsername = this.submitUsername.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }

  //Tracks the changes to the username and updates state.
  onUserChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  //When has changed username and leaves the field sends update username to server.
  onBlur(event){
    if(event.target.value !== this.state.currentUser){
      this.submitUsername(event.target.value)
    } else {
      event.preventDefault()
    }
  }

  //When user submites message with Enter key, sends to server.
  onKeyUp(event){
    if(event.keyCode === 13){
      this.submitMessage(event)
    } else {
      event.preventDefault()
    }
  }

  //Calls addMessage function and sends info with type: notification
  //Also updates the user in the notification sent to be the new this.state.currentUser
  submitUsername(newName){
    let type = "notification";
    this.props.addMessage(
      this.props.currentUser, 
      `${this.state.currentUser} changed their username to ${newName}`, 
      type
    )
    this.setState({currentUser: newName})
  }

  //Calls addMessage function and sends info with type: message
  submitMessage(event){
    let type = "incomingMessage"
    let message = event.target.value;

    this.props.addMessage(this.state.currentUser, message, type);
    event.target.value = ''
  }


  render() {
    return (
        <footer className="chatbar">
          <input onBlur={this.onBlur} onUserChange={ this.onUserChange } name="chatbarUsername" className="chatbar-username" defaultValue={this.props.currentUser} />
          <input onKeyUp={this.onKeyUp} name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER"/>
        </footer>
    );
  }
}

export default ChatBar;