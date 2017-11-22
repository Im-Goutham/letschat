import React, {Component} from 'react';
import ChatBox from '../Components/ChatBox';
import SidePanel from '../Components/SidePanel';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import $ from 'jquery';
import EmojiPicker from 'emojione-picker';
class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user
    }
  }

  componentDidMount() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar').toggleClass('active');
    });
  }

  render() {
    let {user} = this.state;
    console.log("user data is " + JSON.stringify(user));
    return (<div className="wrapper">
      {/* Sidebar Holder */}
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
          <strong>BS</strong>
        </div>
        <ul className="list-unstyled components">
          <li className="active">
            <a aria-expanded="false">
              <i className="glyphicon glyphicon-home"/>
              Home
            </a>
          </li>
          <li>
            <a href="#">
              <i className="glyphicon glyphicon-briefcase"/>
              About
            </a>
            <a>
              <i className="glyphicon glyphicon-duplicate"/>
              Pages
            </a>
          </li>
          <li>
            <a href="#">
              <i className="glyphicon glyphicon-link"/>
              Portfolio
            </a>
          </li>
          <li>
            <a href="#">
              <i className="glyphicon glyphicon-paperclip"/>
              FAQ
            </a>
          </li>
          <li>
            <a href="#">
              <i className="glyphicon glyphicon-send"/>
              Contact
            </a>
          </li>
        </ul>
        <ul className="list-unstyled CTAs">
          <li>
            <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>
          </li>
          <li>
            <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
          </li>
        </ul>
      </nav>
      {/* Page Content Holder */}

      <div id="content" style={{width:'100%'}}>
        <div className="row header">
          <div className="col-md-3 col-xs-3">
            <button type="button" id="sidebarCollapse" className="btn">
              <i className="glyphicon glyphicon-align-left" />
            </button>
          </div>
          <div className="col-md-6  col-xs-6 text-center profile_name">
            Goutham
          </div>
          <div className="col-md-3  col-xs-3">
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
          <div className="col-md-12">
            <ul className="messages">
              <li className="message left appeared"><div className="avatar"/>
                <div className="text_wrapper">
                  <div className="text">Hello Philip! :)</div>
                </div>
              </li>
              <li className="message right appeared"><div className="avatar"/>
                <div className="text_wrapper">
                  <div className="text">Hi Sandy! How are you?</div>
                </div>
              </li>
              <li className="message left appeared"><div className="avatar"/>
                <div className="text_wrapper">
                  <div className="text">I'm fine, thank you!</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row footer">
          <div className="col-md-1 col-xs-1 text-center">
              <span className="chat-icons"><i className="fa fa-smile-o" aria-hidden="true" /></span>
          </div>
          <div className="col-md-10 col-xs-10">
              <input placeholder="Send a message" type="text" className="form-control chat_textfield" id="usr" />
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
