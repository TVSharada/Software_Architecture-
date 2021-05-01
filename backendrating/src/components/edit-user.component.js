
import React, { Component } from 'react';
import axios from 'axios';


export default class EditUserProfile extends Component {
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail_id = this.onChangeEmail_id.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRe_enterpassword = this.onChangeRe_enterpassword.bind(this);

    this.state= {
      username: '',
      firstname: '',
      lastname: '',
      email_id: '',
      password: '',
      re_enterpassword: ''
    }
  }

  
  componentDidMount(){
    
    axios.fetch('http://localhost:5000/users/login'+this.props.match.params.id)
    .then(response => {
      this.setState({
        username: response.data.username,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email_id: response.data.email_id,
        password: response.data.password,
        re_enterpassword: response.data.re_enterpassword,
      })   
    })
    .catch(function (error) {
      console.log(error);
    })


    axios.fetch('http://localhost/:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          users: response.data.map(user => user.username),
        })
      }
    })
  } 
  onChangeUsername(e) {
    this.setState({
        username: e.target.value
    });
  }

  onChangeFirstname(e) {
    this.setState({
        firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
        lastname: e.target.value
    });
  }

  onChangeEmail_id(e) {
    this.setState({
        email_id: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }
  onChangeRe_enterpassword(e) {
    this.setState({
        re_enterpassword: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser={
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email_id: this.state.email_id,
        password:this.state.password,
        re_enterpassword:this.state.re_enterpassword

    }

    console.log(newUser);

    
    axios.post('http://localhost:5000/users/update/'+this.props.match.param.id, newUser)
      .then(res => {
        console.log(res.data)
        this.props.history.push('/users');
      });

  }
  render() {
    return (
      <div>
      <h3>Edit User Profile</h3>
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
          <label>Firstname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              />
        </div>
        <div className="form-group">
          <label>Lastname: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              />
        </div>
        <div className="form-group">
          <label>Email_id: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.email_id}
              onChange={this.onChangeEmail_id}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group">
          <label>Re_enterpassword: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.re_enterpassword}
              onChange={this.onChangeRe_enterpassword}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit User Profile" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}