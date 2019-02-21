import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Student extends Component {
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
        this.props.history.push('/')
        // window.history.back();
    }
  }
render(){
    return(
        <div className="panel">
            <h2>STUDENT PANEL</h2><hr />
            <img src={require('./image/student4.png')} width="150" height="150" /><br />
            <h3>{this.state.user}</h3>
                <Link to="/student/editdetail"><button className="btnpanel">Edit Detail</button></Link><br /><br />
                <Link to="/student/viewcompany"><button className="btnpanel">View Companies</button></Link><br /><br />
                <Link to="/student/viewjob"><button className="btnpanel">View All Jobs</button></Link>
        </div>
    )
}
}
export default Student;