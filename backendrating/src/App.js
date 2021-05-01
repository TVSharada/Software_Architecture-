import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MobilesList from "./components/mobiles-list.component";
import EditMobile from "./components/edit-mobile.component";
import CreateMobile from "./components/create-mobile.component";
import LoginUsersForm from "./Login";
import RegisterUsers from "./Register";
import Mobilelistadmin from "./components/mobile-list-admin.component";
import EditUserProfile from "./components/edit-user.component";
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={LoginUsersForm} />
      <Route path="/mobiles" component={MobilesList} />
      <Route path="/edit/:id" component={EditMobile} />
      <Route path="/create" exact component={CreateMobile} />
      <Route path="/register" component={RegisterUsers} /> 
      <Route path="/mobilesadmin" component={Mobilelistadmin} />
      <Route path="/update/:id" component={EditUserProfile} />
      </div>
    </Router>
  );
}

export default App;
