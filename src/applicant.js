import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class Applicant extends Component {
        constructor() {
        super();
        this.state = {
            applier: []
        }
    }
    componentDidMount() {
       var root= firebase.database().ref('job/' + this.props.uid[this.props.index])
       if(root.child('apply')){
       root.child('apply').on('value', snap => {
            var obj = snap.val();
            let applier=[];
            for(let key in obj){
                applier.push(obj[key])
            }
            this.setState({
                applier:applier,
            })          
        })
    }
}
    render() {
        return (
            <div>
            {this.state.applier.length?
            <div>
            {this.state.applier.map((data,index)=>(
                <ul>
                <li>{data.name}</li>
                </ul>
            ))}
            </div>
            : <ul><li>No Applicants</li></ul>}
            </div>
        )
    }
}

export default Applicant;