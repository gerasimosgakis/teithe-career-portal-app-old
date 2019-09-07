import React, { Component } from "react";
import { connect } from "react-redux";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import Input from "./Input";

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentRoom: { users: [] },
      messages: [],
      users: []
    };
    this.addMessage = this.addMessage.bind(this);
    let currentUser;
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:e98f7e4e-6aa0-4ef1-bdf8-13985777b3c9",
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e98f7e4e-6aa0-4ef1-bdf8-13985777b3c9/token"
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        console.log(currentUser);
        this.currentUser = currentUser;
        this.setState({ currentUser: currentUser });
        return currentUser.subscribeToRoom({
          roomId: "19398095",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        console.log(currentRoom);
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        });
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this.currentUser.roomSubscriptions["19398095"].cancel();
  }

  addMessage(text) {
    this.state.currentUser
      .sendMessage({
        text,
        roomId: this.state.currentRoom.id
      })
      .catch(error => console.error("error", error));
  }
  render() {
    return (
      <div className="chat-container__inner">
        <h2 className="header">General chat room</h2>
        <MessageList messages={this.state.messages} />
        <Input className="input-field" onSubmit={this.addMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(ChatApp);
