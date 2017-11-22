import React, {Component} from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import login from './Pages/Login';
import home from './Pages/Home';
import {connect} from 'react-redux';
import {saveUser} from './reducers/user';


class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentWillMount(){
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      let {saveUser} = this.props;
      saveUser(user);
  }


  render() {
    return (
      <BrowserRouter>
       <div>
          <Switch>
               <Route exact path='/'  component={login} />
               <Route exact path='/home'  component={home} />
          </Switch>
        </div>
      </BrowserRouter>
      );
  }
}

export default connect(
  (state) => ({user: state.user.user}),
  {saveUser}
)(App)
