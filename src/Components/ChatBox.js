import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

class ChatBox extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
      messages: [],
      showEmoji: false
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.userTyping = this.userTyping.bind(this);
    this.showEmoji = this.showEmoji.bind(this);
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



  showEmoji(){
      this.setState({showEmoji: !this.state.showEmoji})
  }

  getEmoji(emoji){
      console.log("emoji is "+emoji);
      let chat_input = document.getElementById('chat_input'); // or $('#myinput')[0]
      var caretPos = chat_input.selectionStart;
      let input_value = chat_input.value;
      var res = input_value.slice(0, caretPos);
      var res1 = input_value.slice(caretPos, input_value.length);
      document.getElementById('emoji_text').innerHTML = '&#x'+emoji+';';
      document.getElementById('chat_input').value = res+" "+document.getElementById('emoji_text').innerHTML+" "+res1;
  }

  render() {
    let {user,showEmoji,all_messages} = this.state;

    console.log("user in chatbox..."+JSON.stringify(user));
    return (
      <div id="content" style={{width:'100%'}}>
        <div className="row header">
          <div className="col-md-8  col-xs-6 profile_name">
            Sandy
          </div>
          <div className="col-md-4  col-xs-6 text-right">
            <div className="col-md-4 col-xs-4">
              <i className="fa fa-phone" aria-hidden="true"/>
            </div>
            <div className="col-md-4 col-xs-4">
              <i className="fa fa-video-camera" aria-hidden="true"/>
            </div>
            <div className="col-md-4 col-xs-4">
              <i className="fa fa-ellipsis-v" aria-hidden="true"/>
            </div>
          </div>
        </div>
        <div className="row chatbox">
            <ul className="messages">
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hello Philip! :)</div>
                </div>
              </li>
              <li className="message right appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hi Sandy! How are you?</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">I'm fine, thank you!</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hello Philip! :)</div>
                </div>
              </li>
              <li className="message right appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hi Sandy! How are you?</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">I'm fine, thank you!</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hello Philip! :)</div>
                </div>
              </li>
              <li className="message right appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">Hi Sandy! How are you?</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar hidden-xs"> <img src="https://www.gannett-cdn.com/-mm-/1bc09ac8001ac5cd3ffef4723dba6007dbc8aeda/c=72-0-1947-2500&r=537&c=0-0-534-712/local/-/media/2016/08/10/GreatFalls/B9323321437Z.1_20160810182558_000_GFFFANB82.1-0.jpg" className="img-circle" alt="Cinque Terre" width={50} height={50} /></div>
                <div className="text_wrapper">
                  <div className="text">I'm fine, thank you!</div>
                </div>
              </li>
            </ul>
            {
                (showEmoji)?(
                    <EmojiPicker width="400px" height="280" onEmojiClick={this.getEmoji.bind(this)}/>
                ):(null)
            }
        </div>
        <div className="row footer">
          <div className="col-md-1 col-xs-1 text-center">
              <span className="chat-icons" onClick={this.showEmoji}><i className="fa fa-smile-o" aria-hidden="true" /></span>
          </div>
          <div className="col-md-10 col-xs-9" style={{paddingRight:0}}>
              <p id="emoji_text">&#x1f922;</p>
              <input placeholder="Send a message" type="text" className="form-control chat_textfield" id="chat_input" />
          </div>
          <div className="col-md-1 col-xs-1 text-center">
              <span className="chat-icons"><i className="fa fa-camera" aria-hidden="true" /></span>
          </div>
        </div>
      </div>
      );
  }
}

export default ChatBox;
