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
      currentUser: "Dave",
      messages:[],
      receivedMessages: []
    }
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = (event) => {
      console.log("Connection Made")
    };

    this.socket.onmessage =  (event) => {
      console.log(event.data);
      const eventObject = JSON.parse(event.data)

      const newReceivedMessage = {
        id: eventObject.id,
        type: eventObject.type,
        username: eventObject.username,
        message: eventObject.message
      }

      const old = this.state.receivedMessages;
      const newReceivedMessages = [...old, newReceivedMessage]
      this.setState({
        receivedMessages: newReceivedMessages,
        currentUser: newReceivedMessage.username
      })

      console.log(this.state.currentUser)

    }

    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 10, username: "Michelle", message: "Hello there!", type: "incomingMessage"};
    //   const messages = this.state.receivedMessages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  addMessage(username, message, type) {
    const newMessage = {
      id: Math.random(),
      type: type,
      message: message,
      username: username
    }

    this.socket.send(JSON.stringify({
      username: username,
      message: message,
      type: type
    }))

  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList key={this.state.receivedMessages.id} messages={this.state.receivedMessages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
