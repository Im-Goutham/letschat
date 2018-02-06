import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import * as firebase  from 'firebase';

var config = {
  apiKey: "AIzaSyD7enQ5aB4bwRsQByGFGJH9uTOcci3JBfE",
  authDomain: "chat-app-bf326.firebaseapp.com",
  databaseURL: "https://chat-app-bf326.firebaseio.com",
  projectId: "chat-app-bf326",
  storageBucket: "chat-app-bf326.appspot.com",
  messagingSenderId: "844523688801"
};
firebase.initializeApp(config);


ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
