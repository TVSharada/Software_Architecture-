import React, { Component } from 'react';


import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';

export default class CreateUser extends Component {
  render() {
    return (
      <div className = "login_register">
        <BrowserRouter>
        <div>
          <div className="login_reg_header">
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Click here to login)</small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small>(Click here to register)</small>
          </div>
          <div className="login_reg_content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </div> 
        
        </BrowserRouter>
      </div>
    )
  }
}