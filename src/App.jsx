import React, {Component} from 'react';
import NavBar from "./NavBar.jsx"
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"
const uuid = require('uuid/v4');



class App extends Component {
  constructor(){
    super()

    this.addMessage = this.addMessage.bind(this);

    this.state = {
      currentUser: "Anonymous",
      messages:[],
      receivedMessages: [],
      userCount: 0
    }
  }

  componentDidMount() {
    //Create new WebSocket
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connection Made")
    };

    //What to do when client gets a message from server
    this.socket.onmessage =  (event) => {
      const eventObject = JSON.parse(event.data)

      //If it's a number, update current users online count
      if(typeof eventObject === "number"){
        this.setState({userCount: eventObject})
      //Otherwise, it's a message! Go from there.
      } else {
        const newReceivedMessage = {
          id: eventObject.id,
          type: eventObject.type,
          username: eventObject.username,
          message: eventObject.message
        }

        /* Updating received messages array in state.
        ** Update the current user to be the one that submitted the message.
        */ 
        const old = this.state.receivedMessages;
        const newReceivedMessages = [...old, newReceivedMessage]
        this.setState({
          receivedMessages: newReceivedMessages,
          currentUser: newReceivedMessage.username
        })
      }
    }
  }

  //Function to send JSON object to server.
  addMessage(username, message, type) {
    this.socket.send(JSON.stringify({
      username: username,
      message: message,
      type: type
    }))

  }

  //Content to be rendered with necessary parameters from State.
  render() {
    return (
      <div>
        <NavBar numUsers={this.state.userCount}/>
        <MessageList key={this.state.receivedMessages.id} messages={this.state.receivedMessages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
