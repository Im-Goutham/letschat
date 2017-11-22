import React, {Component} from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

class ChatBox extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.userTyping = this.userTyping.bind(this);
  }

  componentDidMount() {
    var _this = this;
    socket.on('chat', function(data) {
      console.log("data is... " + JSON.stringify(data));
      document.getElementById('feedback').innerHTML = '';
      let messages = _this.state.messages;
      data.type = "reply"
      messages.push(data);
      _this.setState({messages});
    });

    socket.on('typing', function(data) {
      console.log("data..in type is .."+data);
      document.getElementById('feedback').innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });
  }

  sendMessage = () => {
    let handle = this.state.user.name;
    let message = this.refs.message.value;
    console.log("handle is .. "+handle+"mesg is .. "+message);
    socket.emit('chat', {
      message: message,
      handle: handle
    });
    let mesgObject = {};
    mesgObject.message = message;
    mesgObject.handle = handle;
    mesgObject.type = "sent";
    let messages = [];
    messages.push(mesgObject);
    this.setState({messages});
    this.refs.message.value = "";
  }

  userTyping = () => {
        socket.emit('typing', this.state.user.name);
  }

  render() {
    let {user,messages} = this.state;
    console.log("user in chatbox..."+JSON.stringify(user));
    return (
        <div className="content">
          <div className="contact-profile">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt />
            <p>Harvey Specter</p>
            <div className="social-media">
              <i className="fa fa-facebook" aria-hidden="true" />
              <i className="fa fa-twitter" aria-hidden="true" />
              <i className="fa fa-instagram" aria-hidden="true" />
            </div>
          </div>
          <div className="messages">
            <ul>
              {
                  (messages.length > 0)?(
                     messages.map((mesg,key)=>{
                       let className = "sent";
                       if(mesg.type == "reply"){
                            className = "replies";
                       }
                         return  <li className={className}>
                             <img src={user.picture} alt={mesg.handle} />
                             <p>{mesg.message}</p>
                            </li>
                     })
                  ):(  <li className="sent">
                      <img src={user.picture} alt />
                      <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
                    </li>)
              }
            </ul>
          </div>
          <div className="message-input">
            <div className="wrap">
              <div id="feedback"></div>
              <input type="text" ref="message" placeholder="Write your message..." onKeyPress={this.userTyping}/>
              <i className="fa fa-smile-o fa-lg smiley" aria-hidden="true" />
              <i className="fa fa-paperclip attachment" aria-hidden="true" />
              <button className="submit" onClick={this.sendMessage}><i className="fa fa-paper-plane" aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      );
  }
}

export default ChatBox;
