import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as firebase from 'firebase';

class Logout extends Component { 
    click(){
        firebase.auth().signOut();
        document.getElementById('lgbtn').className="hide"
    }
  render() {
    return (
        <div>
       <Link to="/"> <button id='lgbtn' className="btn" onClick = {this.click.bind(this)}>Logout</button></Link>
        </div>
    );
  }
}
export default Logout;