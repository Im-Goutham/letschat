import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {saveUser} from '../reducers/user';
import * as firebase  from 'firebase';

class SidePanel extends Component {
  constructor(props) {
    super();
    this.state = {
         user: props.user,
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
    this.signOut = this.signOut.bind(this);
  }



  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
    //  alert("user is "+JSON.stringify(user))
      //window.user = user; // user is undefined if no user signed in
      });
  }



    signOut(){
        console.log("Came here....");
      //   window.FB.logout(function(response) {
      //   // user is now logged out
      // });
      let {saveUser,user} = this.props;
       alert("user is "+JSON.stringify(user))
       let {loginType} = user;
           firebase.auth().signOut().then(function() {
                console.log("Logged out!")
            }, function(error) {
                console.log("email signout "+error.code);
                console.log("email signout "+error.message);
            });
       saveUser(null);
       localStorage.setItem("user", null);
       this.props.history.push("/");
    }



  render() {
    let {user,showEmoji,all_messages} = this.state;
    console.log("user is ..."+JSON.stringify(user));
    return (
      <nav id="sidebar" className="active">
        <div className="sidebar-header col-md-12">
        <div className="col-md-2 text-center">
          <img src={(user.photo)?(user.photo):('images/photo.jpg')} className="img-circle" alt="Cinque Terre" width={35} height={35} />
        </div>
        <div className="col-md-8 hidden-xs text-center" style={{padding: '10px 0px'}}>
            <h3>{user.username}</h3>
        </div>
        <div className="col-md-2 hidden-xs text-right" style={{padding: '10px 0px'}}>
            <span className="dropdown"><i className="fa fa-cog" aria-hidden="true"  data-toggle="dropdown"/>
              <ul className="dropdown-menu">
                   <li onClick={this.signOut} style={{cursor:'pointer'}}><a>Sign out</a></li>
              </ul>
            </span>
        </div>
        </div>
        <div className="nav-content col-md-12" style={{padding:0}}>
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
      );
  }
}


export default withRouter(connect(
  (state) => ({user: state.user.user}),
  {saveUser}
)(SidePanel))
