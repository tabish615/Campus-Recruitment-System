import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class EditDetail extends Component {
    constructor(){
    super();
    }
    componentDidMount(){
        const user = firebase.auth().currentUser;
        firebase.database().ref().child('users/' + user.uid)
        .on('value', snap => 
        {
            const value = snap.val();
            const name = value.name;
            const education = value.education;
            const gpa = value.gpa;
            const skills = value.skills;
            const overview = value.overview;

            if(name !== undefined || null){
                this.refs.name.value = name;
             }
            if(education !== undefined || null){
                this.refs.education.value = education;
            }
            if(gpa !== undefined || null){
                this.refs.gpa.value = gpa;
            }
            if(skills !== undefined || null){
                this.refs.skills.value = skills;
            }
            if(overview !== undefined || null){
                this.refs.oview.value = overview;
            }
        })
    }
    detail(event){
        event.preventDefault();
        firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).update({
        name : this.refs.name.value,
        education : this.refs.education.value,
        gpa : this.refs.gpa.value,
        skills : this.refs.skills.value,
        overview : this.refs.oview.value,
        })
    }
render(){
    return(
        <div>
            <form>
                <fieldset className="editfield">

                    <h1><strong>Edit Detail</strong></h1>
                    {/* <label>Full Name : </label><br /> */}
                    <input className="check" type="text" placeholder="Full Name" required="required" size="50" ref="name" /><br /><br /><br />

                    {/* <label>Education : </label><br /> */}
                    <input className="check" type="text" placeholder="Education" required="required" size="50" ref="education" /><br /><br /><br />

                    {/* <label>GPA : </label><br /> */}
                    <input className="check" type="text" placeholder="GPA" required="required" size="50" ref="gpa" /><br /><br /><br />

                    {/* <label>Skills : </label><br /> */}
                    <input className="check" type="text" placeholder="Skills" required="required" size="50" ref="skills" /><br /><br /><br />

                    {/* <label>Overview : </label><br /> */}
                    <input className="check" type="text" placeholder="Overview" required="required" size="50" ref="oview" /><br /><br /><br /><br />
                    
                    <input className="sbtn" type="submit" value="Update" onClick={this.detail.bind(this)} />
                </fieldset>
            </form>                               
        </div>
    )
}
}
export default EditDetail;