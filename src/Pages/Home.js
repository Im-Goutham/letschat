import React, {Component} from 'react';
import ChatBox from '../components/ChatBox';
import SidePanel from '../components/SidePanel';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import $ from 'jquery';
import EmojiPicker from 'emoji-picker-react';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
      showEmoji: false,
      all_messages: [
          {
             image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
             name:"Anni Carpenter",
             mesg:"Did you talk to Mark?",
             time:"10:30 am"
      },  {
           image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
           name:"Anni Carpenter",
           mesg:"Did you talk to Mark?",
           time:"10:30 am"
        },  {
             image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
             name:"Anni Carpenter",
             mesg:"Did you talk to Mark?",
             time:"10:30 am"
          },  {
               image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
               name:"Anni Carpenter",
               mesg:"Did you talk to Mark?",
               time:"10:30 am"
        },  {
             image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
             name:"Anni Carpenter",
             mesg:"Did you talk to Mark?",
             time:"10:30 am"
          },  {
               image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
               name:"Anni Carpenter",
               mesg:"Did you talk to Mark?",
               time:"10:30 am"
            },  {
                 image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                 name:"Anni Carpenter",
                 mesg:"Did you talk to Mark?",
                 time:"10:30 am"
              },  {
                   image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                   name:"Anni Carpenter",
                   mesg:"Did you talk to Mark?",
                   time:"10:30 am"
                },  {
                     image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                     name:"Anni Carpenter",
                     mesg:"Did you talk to Mark?",
                     time:"10:30 am"
                  },  {
                       image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                       name:"Anni Carpenter",
                       mesg:"Did you talk to Mark?",
                       time:"10:30 am"
                    },  {
                         image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                         name:"Anni Carpenter",
                         mesg:"Did you talk to Mark?",
                         time:"10:30 am"
                      },  {
                           image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                           name:"Anni Carpenter",
                           mesg:"Did you talk to Mark?",
                           time:"10:30 am"
                        },  {
                             image:"http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
                             name:"Anni Carpenter",
                             mesg:"Did you talk to Mark?",
                             time:"10:30 am"
                          }
      ]
    }
    this.showEmoji = this.showEmoji.bind(this);
  }

  componentDidMount() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
    });
  }

  myCallback(data){
      console.log("data is .. "+JSON.stringify(data));
  }

  showEmoji(){
      this.setState({showEmoji: !this.state.showEmoji})
  }

  getEmoji(emoji){
      console.log("emoji is "+emoji);
      document.getElementById('chat_input').value = "&#x2714; &#x2639; &#x263a;";
  }

  render() {
    let {user,showEmoji,all_messages} = this.state;
    console.log("user data is " + JSON.stringify(user));
    return (<div className="wrapper">
      {/* Sidebar Holder */}
      <nav id="sidebar" className="active">
        <div className="sidebar-header">
          <h3>Lets Chat</h3>
          <strong>BS</strong>
        </div>
        <div className="nav-content">
        {
              all_messages.map((message,key)=>{
                 return  <div className="left-message-box col-md-12">
                               <div className="col-md-2 text-center">
                                 <img src={message.image} className="img-circle" alt="Cinque Terre" width={35} height={35} />
                               </div>
                               <div className="col-md-8 hidden-xs">
                                   <h3>{message.name}</h3>
                                   <p>{message.mesg}</p>
                               </div>
                               <div className="col-md-2 hidden-xs"><p className="mesg-time">{message.time}</p></div>
                            </div>
              })
        }
        </div>
      </nav>
      {/* Page Content Holder */}

      <div id="content" style={{width:'100%'}}>
        <div className="row header">
          <div className="col-md-8  col-xs-6 profile_name">
            Goutham
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
          <div className="col-md-10 col-xs-10">
              <input placeholder="Send a message" type="text" className="form-control chat_textfield" id="chat_input" />
          </div>
          <div className="col-md-1 col-xs-1 text-center">
              <span className="chat-icons"><i className="fa fa-camera" aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default withRouter(connect((state) => ({user: state.user.user}))(Home))
