import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class Apply extends Component {
      constructor(props){
        super(props);
        this.state = {
            apply : [],
            btn : false
        }
    }
    componentDidMount() {
        const currentUser= firebase.auth().currentUser.displayName;
        const root= firebase.database().ref('job/' + this.props.uid);
            if(root.child('apply')){
            root.child('apply').on('value', snap => {
            var obj = snap.val();
            var name = [];
            let apply=[];
            for(let key in obj){
                apply.push(obj[key])
            }
            for(let a in apply){
                name.push(apply[a].name)
            }
            for (let b in name){
                if(name[b] === currentUser){
                    
            this.setState({
                btn: true,
            })
                }
            }
            this.setState({
                apply:apply,
            })          
        })
    }
}  
    alert(){
        alert('You are already applied');
}
    render() {
        return (
        <div>
            {this.state.btn ?
                    <button className="pbtn" onClick={this.alert.bind(this)}>Apply</button>
                    
            : <button className="pbtn" onClick={this.props.click}>Apply</button>
            }
        </div>
        )
    }
}

export default Apply;