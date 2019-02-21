import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';



  var config = {
    apiKey: "AIzaSyBDFiP_giInPGBPH_mFX-3GdorOW_u80ak",
    authDomain: "campus-recruitment-syste-34805.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-34805.firebaseio.com",
    projectId: "campus-recruitment-syste-34805",
    storageBucket: "campus-recruitment-syste-34805.appspot.com",
    messagingSenderId: "613591595227"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
