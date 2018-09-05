import React, {Component} from 'react';
import NavBar from "./NavBar.jsx"
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"



class App extends Component {
  constructor(){
    super()

    this.addMessage = this.addMessage.bind(this);

    this.state = {
      currentUser: {name: "Dave"},
      messages:[]
    }
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = (event) => {
      console.log("Connection Made")
    };

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 10, username: "Michelle", content: "Hello there!", type: "incomingMessage"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(username, message) {
    const newMessage = {
      id: Math.random(),
      type: "incomingMessage",
      content: message,
      username: username
    }

    this.socket.send(JSON.stringify({
      username: username,
      content: message
    }))

    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage]
    this.setState({messages: newMessages})
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList key={this.state.messages.id} messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
