import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as firebase from 'firebase';

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      userType : null
    }
  }
    componentDidMount(){
    document.getElementById('lgbtn').className="hide"
  }
  submission(event){
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.pass.value).then((data) =>
    {
      firebase.auth().currentUser.updateProfile({displayName:this.refs.name.value,})

      firebase.database().ref().child("users/"+firebase.auth().currentUser.uid).set({
        email : this.refs.email.value,
        password : this.refs.pass.value,
        name : this.refs.name.value,
        type : this.state.userType,
        education : null,
        GPA : null,
        skills : null,
        overview : null,
      })
    })
      if (this.refs.cmp.checked === true){
      const comp = this.state.userType = "company"
      this.setState({userType: comp})
    }
        else{
      const stu = this.state.userType = "student"
      this.setState({userType: stu})
    }
    }
  render() {
    return (
        <form>
          <fieldset className="Input">
            <h1><strong>Signup</strong></h1>
            {/* <label>Full Name : </label><br /> */}
            <input className="check" type="text" placeholder="Full Name" required="required" size="50" ref="name" /><br /><br /><br />
            {/* <label>Email : </label><br /> */}
            <input className="check" type="text" placeholder="Email" required="required" size="50" ref="email"/><br /><br /><br />
            {/* <label>Password : </label><br /> */}
            <input className="check" type="Password" placeholder="Password" required="required" size="50" ref="pass"/><br /><br /><br />
            {/* <label>Please Select : </label><br /> */}
            <input type="radio" name="select" value="student" checked="checked" ref="std" /> Student
            <input type="radio" name="select" value="company" ref="cmp"/> Company <br /><br /><br /><br />
            <input className="sbtn"type="submit" value="Signup" onClick={this.submission.bind(this)}/>
          </fieldset>
        </form>
    )
  }
}
export default Signup;