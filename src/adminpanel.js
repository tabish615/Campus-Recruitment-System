import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';


class AdminPanel extends Component {
  constructor(){
    super();
    this.state = {
      user : null
    }
  }
  componentDidMount(){
    if(firebase.auth().currentUser !== null){
      const user = firebase.auth().currentUser;
      firebase.database().ref().child('users/' + user.uid).on('value', snap => {
        this.setState({user:snap.val().name})
      })
    }
    else{
        // this.props.history.push('/')
        // window.history.back();
    }
  }
  render() {
    return (
        <div className="panel">
          <h2>ADMIN PANEL</h2><hr />
           <img src={require('./image/admin-image.png')} width="150" height="150" /><br />
          <h3>{this.state.user}</h3>
          <Link to="/admin/viewstudent"><button className="btnpanel">View All Students</button></Link><br /><br />
          <Link to="/admin/viewcompany"><button className="btnpanel">View All Companies</button></Link><br /><br />
          <Link to="/admin/viewjob"><button className="btnpanel">View All Jobs</button></Link>
        </div>  
    )
  }
}
export default AdminPanel;