import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {saveUser} from '../reducers/user';
import * as firebase  from 'firebase';


class Login extends Component {
  constructor() {
    super();
    this.state = {
         formType:'login',
         email:'',
         password:'',
         photo:''
    }

      this.database =  firebase.database();
//     this.responseFacebook = this.responseFacebook.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.emailSignUp = this.emailSignUp.bind(this);
      this.emailSignIn = this.emailSignIn.bind(this);
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



  componentDidMount(){
      // const rootRef =  firebase.database().ref('users');
    //    console.log("callee "+rootRef)

       //  this.database.ref('users').on("value", function(snapshot) {
       //      console.log(snapshot.val());
       // }, function (error) {
       //     console.log("Error: " + error.code);
       //  });


       var user = firebase.auth().currentUser;

      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }

  }



  componentWillReceiveProps(nextprops){
       let {user} = nextprops;
       console.log("user data in props is .. "+JSON.stringify(user));
  }

 // responseFacebook = (user) => {
 //   console.log("fb called..");
 //    console.log(user);
 //    let {saveUser} = this.props;
 //    let userData = {};
 //    userData.name = user.name;
 //    userData.picture = user.picture.data.url;
 //    userData.email = user.email;
 //    saveUser(userData);
 //    localStorage.setItem("user", JSON.stringify(userData));
 //    this.props.history.push("/home");
 //  }

  googleSignin(){
    alert("google login ")
   var _this = this;
   let {saveUser} = this.props;
   var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider).then(function(result) {

            var token = result.credential.accessToken;
            var user = result.user;
            let {email,uid,displayName,photoURL}=user;
            console.log("google user is  "+JSON.stringify(result));
          //  alert("email user is  "+email+"  id is "+uid);
            // rootRef.push ({
            //    uid: uid,
            //    email: email
            // });


            let emailUser={email:email,uid:uid,username:displayName,photo:photoURL};
            emailUser.loginType='google';
            saveUser(emailUser);
            localStorage.setItem("user", JSON.stringify(emailUser));
            _this.validateUser(emailUser);
          //  console.log(token)
          //  console.log(user)
         }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
         });
  }


  facebookSignin(){
    var _this = this;
    let {saveUser} = this.props;
    var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)

        .then(function(result) {
           var token = result.credential.accessToken;
           var user = result.user;
          console.log("fb user is  "+JSON.stringify(result));
          let {email,uid,displayName,photoURL}=user;
        //  alert("email user is  "+email+"  id is "+uid);
          // rootRef.push ({
          //    uid: uid,
          //    email: email
          // });
          let emailUser={email:email,uid:uid,username:displayName,photo:photoURL};
          emailUser.loginType='facebook';
          saveUser(emailUser);
          localStorage.setItem("user", JSON.stringify(emailUser));
          _this.validateUser(emailUser);
        //   console.log(token)
        //   console.log(user)
        }).catch(function(error) {
           console.log(error.code);
           alert(error.message);
        });
   }


   emailSignUp(e){
     alert("email signup called")
     var _this = this;
     e.preventDefault();
      var email = this.state.email;
      var username = this.state.username;
      var password = this.state.password;

      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
        let {email,uid}=result;
      //  alert("email user is  "+email+"  id is "+uid);
        // rootRef.push ({
        //    uid: uid,
        //    email: email
        // });
        let emailUser={email:email,uid:uid,username:username};
        emailUser.loginType='email';
        saveUser(emailUser);
        localStorage.setItem("user", JSON.stringify(emailUser));
        _this.validateUser(emailUser);
        //   console.log(token)
        //   console.log(user)
        }).catch(function(error) {
       console.log(error.code);
       alert(error.message);
      });
   }


       validateUser(data){
         console.log("In validateUser ")
         var _this = this;
         let {uid} = data;
         alert("In validateUser "+uid)
         var usersRef = _this.database.ref('users/'+uid );
         usersRef.on('value', function(snapshot) {
           var userData = snapshot.val();
           if(!userData){
             console.log("userData is 12"+JSON.stringify(userData))
              _this.saveUsertoDb(data)

           }
          usersRef.off();
          _this.props.history.push("/home");
         });
       }


        saveUsertoDb(data){
         //     alert("user data  "+JSON.stringify(data))
             console.log("came here 12333 "+JSON.stringify(data))
              let {uid,email,username,photo} = data;
              if(!photo){
                 photo='';
              }
              this.database.ref('users/' + uid).set({
                    uid: uid,
                    email: email,
                    username: username,
                    photo: photo
                  });
              //     var user = firebase.auth().currentUser;
              //   alert('user is  '+JSON.stringify(user));
              //     user.sendEmailVerification().then(function(result) {
              // // Email sent.
              //  alert(""+result)
              //     }).catch(function(error) {
              //       // An error happened.
              //     });
             //this.props.history.push("/home");
        }

     emailSignIn(e){
         e.preventDefault();
         var _this = this;
         alert("login")
         let {email,password} = this.state;
          firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
            console.log("email sign in "+JSON.stringify(result));
            let {uid} = result;
            _this.getUser(uid);
            //   console.log(token)
            //   console.log(user)
          }).catch(function(error) {
             console.log(error.code);
             alert(error.message);
          });
     }


     getUser(uid){
       let _this = this;
       let {saveUser} = this.props;
       alert("uid is "+uid)
       var getUserRef = _this.database.ref('users/'+uid );
       getUserRef.on('value', function(snapshot) {
         var userData = snapshot.val();
         alert("get user userData is 12"+JSON.stringify(userData))
         userData.loginType='email';
         saveUser(userData);
         localStorage.setItem("user", JSON.stringify(userData));
          _this.props.history.push("/home");
       });
     }


   handleEmail(ev) {
     this.setState({
       email: ev.target.value
     });
   }

   handleUsername(ev) {
     this.setState({
       username: ev.target.value
     });
   }

   handlePassword(ev) {
     this.setState({
       password: ev.target.value
     });
   }



  render() {
    let {formType} = this.state;
    return (

      <div className="limiter">
      <div className="container-login100" style={{backgroundImage: 'url("images/bg-01.jpg")'}}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form">
            {
               (formType=='login')?(
                 <span className="login100-form-title p-b-49">
                   Login
                 </span>
               ):(
                 <span className="login100-form-title p-b-49">
                   Sign Up
                 </span>
               )
            }

            <div className="wrap-input100 validate-input m-b-23" data-validate="Email is required">
              <span className="label-input100">Email</span>
              <input className="input100" value={this.state.email} type="text" name="email" placeholder="Type your email"  onChange={this.handleEmail} />
              <span className="focus-input100" data-symbol="" ></span>
            </div>
            {
              (formType!='login')?(
                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                  <span className="label-input100">Username</span>
                  <input className="input100" value={this.state.username} type="text" name="username" placeholder="Type your username"  onChange={this.handleUsername} />
                  <span className="focus-input100" data-symbol="" ></span>
                </div>
              ):(null)
            }
            <div className="wrap-input100 validate-input" data-validate="Password is required"  onChange={this.handlePassword}>
              <span className="label-input100">Password</span>
              <input className="input100" value={this.state.password} type="password" name="pass" placeholder="Type your password" />
              <span className="focus-input100" data-symbol="" ></span>
            </div>
            <div className="text-right p-t-8 p-b-31">
            {
              (formType=='login')?(

                  <a >
                    Forgot password?
                  </a>

              ):(
                 null
              )
            }
           </div>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn" ></div>
                {
                    (formType=="login")?(
                      <button className="login100-form-btn" onClick={this.emailSignIn.bind(this)}>
                        Login
                      </button>
                    ):(
                      <button className="login100-form-btn" onClick={this.emailSignUp.bind(this)}>
                        Sign Up
                      </button>
                    )
                }
              </div>
            </div>
            {
                (formType=='login')?(
                  <div className="text-center p-t-8 p-b-31" style={{paddingTop:25}}>
                     Don't have an account? <a onClick={() =>{this.setState({formType:'signup',email:'',username:'',password:''})}}>Sign up</a>
                  </div>
                ):(
                  <div className="text-center p-t-8 p-b-31" style={{paddingTop:25}}>
                     Already have an account? <a  onClick={() =>{this.setState({formType:'login',email:'',username:'',password:''})}}>Login</a>
                  </div>
                )
            }

            <div className="txt1 text-center p-t-54 p-b-20">
            {
              (formType=='login')?(
                <span>
                  Or Sign Up Using
                </span>
              ):(
                <span>
                  Or Login Up Using
                </span>
              )
            }

            </div>
            <div className="flex-c-m">
              <a className="login100-social-item bg1">
                <i className="fa fa-facebook" onClick={this.facebookSignin.bind(this)}/>
              </a>
              <a  className="login100-social-item bg2">
                <i className="fa fa-twitter" />
              </a>
              <a className="login100-social-item bg3"  onClick={this.googleSignin.bind(this)}>
                <i className="fa fa-google" />
              </a>
            </div>
          </form>
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



//
// Old code
//   <div className="container-fluid">
//     <div className="row login_main">
//       <div className="login_box">
//
//       {/* Old facebook login
//         <FacebookLogin
//             appId="1710237039008375"
//             autoLoad={true}
//             fields="name,email,picture"
//             callback={this.responseFacebook}
//             icon="fa-facebook"
//             />
//       */}
//       <button type="button" className="btn btn-primary" onClick={this.googleSignin.bind(this)}>Google Login</button>
//       <button type="button" className="btn btn-success" onClick={this.facebookSignin.bind(this)}>Facebook Login</button>
//       <button type="button" className="btn btn-info">Twitter Login</button>
//        </div>
//     </div>
//   </div>
//
