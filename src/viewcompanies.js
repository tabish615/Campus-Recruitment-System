import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class AllCompanies extends Component {
  constructor(){
        super();
        this.state = {
            students : [],
            companies : [],
            all :[],
            uid : [],
            type : true,
        }
    }
    componentDidMount(){
        firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).on('value', snap =>{

                    const typeCheck = snap.val()
                    const xyz = typeCheck.type
                    if(xyz === 'student'){
                    this.setState({type: false,})
                    }
                    else if(xyz === 'company'){
                    this.setState({type: false,})
                    }
                    else if(xyz === "admin"){
                    this.setState({type: true,})
                    }
})
        firebase.auth().onAuthStateChanged(()=>{
            if(firebase.auth().currentUser){
                firebase.database().ref("users").on("value", snap=>{

                    let obj = snap.val();
                    let companiesObj = {};
                    let studentsObj = {};
                    let uidObj = {};
                    for(let key in obj){
                        if(obj[key].type.toLowerCase() === "student"){
                            studentsObj[key] = obj[key];
                        }
                        else if(obj[key].type.toLowerCase() === "company"){
                            companiesObj[key] = obj[key];
                            uidObj[key] = key;
                        }
                    }
                    let students = [];
                    let companies = [];
                    let uid = [];
                    for(let a in companiesObj){
                        companies.push(companiesObj[a])
                    }
                    for(let a in studentsObj){
                        students.push(studentsObj[a])
                    }
                    for(let i in uidObj){
                        uid.push(uidObj[i])
                    }
                    this.setState({
                        students : students,
                        companies : companies,
                        uid : uid,
                    })
                })
            }
        })
    }
    removeTask(index){
            const uid = this.state.uid.slice(0);
            const uidKey = uid[index];
                firebase.database().ref("users").child(uidKey).remove().then(alert("Removed"))
                .catch(function(error){alert(error)})
            uid.splice(index, 1);
            const companies = this.state.companies.slice(0);
            companies.splice(index, 1);
            this.setState({
                companies: companies,
                uid : uid,
            });
        }
  render() {
      return(
        <div className="all">
            <h3>All Companies</h3>          
            <hr /><br />    
            {
                this.state.companies && this.state.companies.length ?
                this.state.companies.map((data, index) => {
                    return <div className="list">
                            <ul className="abc">
                                <li> {<span><strong>Name : </strong></span>} {data.name}</li>
                                <li> {<span><strong>Email : </strong></span>} {data.email}</li><br />
                                {/* <td><button>View</button></td> */}
                                <li>
                                    {this.state.type && <button className="pbtn" onClick={this.removeTask.bind(this, index)}>Delete</button>}</li>
                            </ul>
                    </div>
                })
                :false
            }                                    
        </div>
    )
}
}
export default AllCompanies;