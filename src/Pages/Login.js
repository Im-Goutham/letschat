import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {saveUser} from '../reducers/user';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      
    }
     this.responseFacebook = this.responseFacebook.bind(this);
  }

  componentWillMount(){
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      let {saveUser} = this.props;
      saveUser(user);
      if(user){
           this.props.history.push("/home");
      }
  }



  componentWillReceiveProps(nextprops){
       let {user} = nextprops;
       console.log("user data in props is .. "+JSON.stringify(user));
  }

 responseFacebook = (user) => {
   console.log("fb called..");
    console.log(user);
    let {saveUser} = this.props;
    let userData = {};
    userData.name = user.name;
    userData.picture = user.picture.data.url;
    userData.email = user.email;
    saveUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    this.props.history.push("/home");
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row login_main">
            <div className="login_box">
              <FacebookLogin
                  appId="1710237039008375"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  icon="fa-facebook"
                  />
             </div>
          </div>
        </div>
      );
  }
}



export default withRouter(connect(
  (state) => ({user: state.user.user}),
  {saveUser}
)(Login))
