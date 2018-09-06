import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser
    }
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.submitUsername = this.submitUsername.bind(this)
  }

  onChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onBlur(event){
    if(event.target.value !== this.state.currentUser){
      this.submitUsername(event.target.value)
    } else {
      console.log("Default Prevented")
      event.preventDefault()
    }
  }

  submitUsername(newName){
    event.preventDefault()
    let type = "notification";
    this.props.addMessage(
      this.props.currentUser, 
      `${this.state.currentUser} changed their username to ${newName}`, 
      type
    )
    this.setState({currentUser: newName})
  }

  onSubmitMessage(event){
    event.preventDefault()
    let type = "incomingMessage"
    let message = event.target.elements.chatbarMessage.value;

    this.props.addMessage(this.state.currentUser, message, type);
    event.target.elements.chatbarMessage.value = ''
  }
  //onSubmit={(event) => this.onSubmitMessage(event)

  render() {
    return (
        <footer className="chatbar">
          <input onBlur={this.onBlur} onChange={ this.onC } name="chatbarUsername" className="chatbar-username" defaultValue={this.props.currentUser} />
          <input name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER"/>
        </footer>
    );
  }
}

export default ChatBar;