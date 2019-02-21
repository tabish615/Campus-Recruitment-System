import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Company extends Component {
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
                <h2>COMPANY PANEL</h2><hr />
                <img src={require('./image/company.png')} width="150" height="150" /><br />
                <h3>{this.state.user}</h3>
                    <Link to="/company/viewstudent"><button className="btnpanel">View All Students</button></Link><br /><br />
                    <Link to="/company/postjob"><button className="btnpanel">Post Job</button></Link><br /><br />
                    <Link to="/company/mypostjob"><button className="btnpanel">My Posted Job</button></Link>
        </div>
    )
}
}
export default Company;