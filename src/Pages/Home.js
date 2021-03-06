import React, {Component} from 'react';
import ChatBox from '../components/ChatBox';
import SidePanel from '../components/SidePanel';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import $ from 'jquery';


class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user,
      showEmoji: false
    }

  }






  render() {
    let {user} = this.state;
    console.log("user data is " + JSON.stringify(user));
    return (<div className="wrapper">
      {/* Sidebar Holder */}
        <SidePanel user={user}/>
      {/* Page Content Holder */}

       <ChatBox user={user}/>
    </div>);
  }
}

export default withRouter(connect((state) => ({user: state.user.user}))(Home))
