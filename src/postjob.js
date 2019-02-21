import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class PostJob extends Component {

    posted(event){
        event.preventDefault();
        firebase.database().ref().child("job/").push({
        title : this.refs.title.value,
        salary : this.refs.salary.value,
        description : this.refs.jd.value,
        email: firebase.auth().currentUser.email
        }).then(alert('Job Posted')).catch(function(error){alert(error.message)})
    }
render(){
    return(
        <div>
            <form>
                <fieldset className="editfield">
                    <h1><strong>Post Job</strong></h1>
                    {/* <label>Title : </label><br /> */}
                    <input className="check" type="text" placeholder="Title here" required="required" size="50" ref="title" /><br /><br /><br />
                    {/* <label>Salary : </label><br /> */}
                    <input className="check" type="text" placeholder="Salary here" required="required" size="50" ref="salary" /><br /><br /><br />
                    {/* <label>Job Description : </label><br /> */}
                    <input className="check" type="text" placeholder="Job Description here" required="required" size="50" ref="jd" /><br /><br /><br /><br />
                    <input className="sbtn" type="submit" value="Post"  onClick={this.posted.bind(this)} />
                </fieldset>
            </form>                                  
        </div>
    )
}
}
export default PostJob;