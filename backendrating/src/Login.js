import React, { Component, useState } from 'react';

import { Link, Redirect, Route, Switch, NavLink  } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
//import LoginUsersForm from "./Login";
import RegisterUsers from "./Register";

export default class LoginUsersForm extends Component{
constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
     
    this.onSubmit = this.onSubmit.bind(this);

    this.state= {
      username: '',
      password:'',
    };
  }
  

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const loginUser={
      username: this.state.username,
      password: this.state.password,
     
    }; 

    console.log(loginUser);

    axios.post('http://localhost:5000/users/login', loginUser)
      .then(res => {
          localStorage.setItem('auth',JSON.stringify(res.data));
          if( loginUser.username =="admin") {
            this.props.history.push('/mobilesadmin');
          } else{
          this.props.history.push('/mobiles');
          const token = res.data.token;
          localStorage.setItem('jwttoken', token);
        }
         /* if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            delete axios.defaults.headers.common['Authorization']; 
          } */
          //dispatch(SET_CURRENT_USER(jwt.decode(token)));
      });
   
    //window.location = '/';
  }

   render() {
      return (
        <div> 
            <h3>User Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                   />
              </div>
              <div className="form-group"> 
                <label>Password: </label>
                <input  type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
              <br />
              <h4>If new user, click here to Register </h4>
              <div className="login_reg_content">
                <Switch>
                  <NavLink activeClassName="active" value="Register" className="btn btn-primary" to="/register">Register</NavLink>
                </Switch>
              </div>
            </form>
        </div>
     )
   }
}

//export default connect(null, { login })(LoginUsersForm);
   