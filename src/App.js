import React, { Component } from 'react';
import './App.css';
import Signup from './signup.js';
import Signin from './signin.js';
import Signbtn from './signbtn.js';
import AdminPanel from './adminpanel.js';
import AllStudents from './viewstudents.js';
import AllCompanies from './viewcompanies.js';
import AllJobs from './viewjobs.js';
import Student from './student.js';
import Company from './company.js';
import Logout from './logout.js';
import PostJob from './postjob.js';
import MyPostedJob from './mypostjob.js';
import EditDetail from './editdetail.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';

class App extends Component {
 
  render() {
    return (
   <Router>
      <div className="App">
        <div className="App-header">
          <h2>Campus Recruitment System</h2>
        <Route path="/signup" component={Signbtn} />
        <Route exact path="/" component={Signbtn} />
        <Logout />
      </div>
        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/admin/viewstudent" component={AllStudents} />
        <Route path="/admin/viewcompany" component={AllCompanies} />
        <Route path="/admin/viewjob" component={AllJobs} />
        <Route path="/student" component={Student} />
        <Route path="/company" component={Company} />
        <Route path="/student/editdetail" component={EditDetail} />
        <Route path="/student/viewcompany" component={AllCompanies} />
        <Route path="/student/viewjob" component={AllJobs} />
        <Route path="/company/viewstudent" component={AllStudents} />
        <Route path="/company/postjob" component={PostJob} />
        <Route path="/company/mypostjob" component={MyPostedJob} />
      </div>
      </Router>
    );
  }
}

export default App;
