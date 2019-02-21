import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Applicant from './applicant.js';

class MyPostedJob extends Component {
    constructor(){
        super();
        this.state = {
            jobs : [],
            uid : []
        }
    
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('job').orderByChild('email').equalTo(firebase.auth().currentUser.email)
                .once('value').then((snap) => {
                    var obj = snap.val();
                    let uid = [];
                    let jobs = [];
                    for (let key in obj) {
                        uid.push(key);
                        jobs.push(obj[key]);
                    }
                    this.setState({ jobs, uid })
                })

            }
        })
    }
    removeTask(index){
            const uid = this.state.uid.slice(0);
            const uidKey = uid[index];
                firebase.database().ref("job").child(uidKey).remove().then(alert("Removed"))
                .catch(function(error){alert(error)})
            uid.splice(index, 1);
            const jobs = this.state.jobs.slice(0);
            jobs.splice(index, 1);
            this.setState({
                jobs: jobs,
                uid : uid,
            });
        }
render(){
    return(
        <div className= "all">    
            <h3>Your Posted Jobs</h3><hr /><br />
                    {this.state.jobs.map((job, index) => ( 
                    <div className="list">
                        <ul className="abc">
                        <li key={index}>
                            <li>{<span><strong>Job Title: </strong></span>}   {job.title} </li>
                            <li>{<span><strong>Salary: </strong></span>}  {job.salary}   </li>
                            <li>{<span><strong>Job Description: </strong></span>} {job.description} </li>
                            <li>{<span><strong>Applier: </strong></span>}{
                                <Applicant index={index} uid={this.state.uid} />
                            }</li>
                            <li><button className="pbtn"onClick={this.removeTask.bind(this, index)}>Delete</button></li>
                        </li>
                        </ul>
                        </div>
        
                    ))}                          
        </div>
    )
}
}
export default MyPostedJob;