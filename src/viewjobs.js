import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Apply from './apply.js';

class AllJobs extends Component {
      constructor(props){
        super(props);
        this.state = {
            jobs : [],
            uid : [],
            type: true,
            check: true,
            button: [],
            view : [],
            title : [],
        }
    }
    componentDidMount(){
        firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).on('value', snap =>{

                    const typeCheck = snap.val()
                    const xyz = typeCheck.type
                    if(xyz === 'student'){
                    this.setState({type: false,})
                    this.setState({check: true,})
                    }
                    else if(xyz === 'company'){
                    this.setState({type: false,})
                    this.setState({check: false,})
                    }
                    else if(xyz === "admin"){
                    this.setState({type: true,})
                    this.setState({check: false,})
                    }
})
        firebase.auth().onAuthStateChanged(()=>{
            if(firebase.auth().currentUser){
                firebase.database().ref("job").on("value", snap=>{

                    let obj = snap.val();
                    let jobsObj = {};
                    let uidObj = {};
                    for(let key in obj){
                            jobsObj[key] = obj[key];
                            uidObj[key] = key;
                    }
            
                    let jobs = [];
                    let uid = [];
                    let button = [];
                    let view = [];
                    let title = [];
                    for(let a in jobsObj){
                        jobs.push(jobsObj[a])
                    }
                    for(let i in uidObj){
                        uid.push(uidObj[i])
                        title.push(true);
                        button.push("View");
                        view.push(false);
                    }
                    this.setState({
                        jobs : jobs,
                        uid : uid,
                        title : title,
                        view : view,
                        button : button,
                    });
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
    applyJob(index){
        var currentUser= firebase.auth().currentUser;
        var currentId= firebase.auth().currentUser.uid;
        firebase.database().ref(currentId).on("value",snap=>{
            let obj=(snap.val() || {
                name: currentUser.displayName,
                email: currentUser.email,
            });
        var rootRef=firebase.database().ref();
        const speedRef=rootRef.child("job/"+this.state.uid[index]+"/apply/"+currentId).set(obj)
        })
        alert('Applied');
    }
    click(index){
        if(this.state.button[index] === "Hide"){
            const button = this.state.button.slice(0);
            button.splice(index, 1, "View");
            const view = this.state.view.slice(0);
            view.splice(index, 1, false);
            const title = this.state.title.slice(0);
            title.splice(index, 1, true);
            this.setState({
                view: view,
                button: button,
                title: title,
    })
 }
        else if(this.state.button[index] === "View"){
            const button = this.state.button.slice(0);
            button.splice(index, 1, "Hide");
            const view = this.state.view.slice(0);
            view.splice(index, 1, true);
            const title = this.state.title.slice(0);
            title.splice(index, 1, false);
            this.setState({
                view: view,
                button: button,
                title: title,
    })
}
}
  render() {
    return (
        <div className="all">
            <h3>All Jobs</h3>          
            <hr /><br />    
            {
                this.state.jobs && this.state.jobs.length ?
                this.state.jobs.map((data, index) => {
                    return <div className="list">
                        <ul className="abc">
                            {this.state.title[index] && <li><span><strong>Job Title : </strong></span>{data.title}</li>}
                            {this.state.view[index] &&
                            <div>
                            <li> {<span><strong>Job Title : </strong></span>}      {data.title}</li>
                            <li> {<span><strong>Salary : </strong></span>}      {data.salary}</li>
                            <li> {<span><strong>Job Description : </strong></span>}      {data.description}</li>
                            <li> {<span><strong>Posted By : </strong></span>}      {data.email}</li>
                            </div>
                            }
                             {this.state.check && <li>{<Apply click={this.applyJob.bind(this, index)} uid={this.state.uid[index]}/>}</li>}
                            <li>{this.state.type && <button className="pbtn" onClick={this.removeTask.bind(this, index)}>Delete</button>}</li>
                            <li><button className="pbtn" onClick={this.click.bind(this, index)}>{this.state.button[index]}</button></li>
                        </ul>
                    </div>
                })
                :false
            }                                    
        </div>
    )
}
}
export default AllJobs;