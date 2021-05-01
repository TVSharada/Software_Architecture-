import React, { Component, styles, View } from 'react';
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import CreateMobile from "./create-mobile.component";

const Mobile = props => (
  <tr>
    <td>{props.mobile.mobilename}</td>
    <td>{props.mobile.description}</td>
    <td>{props.mobile.price}</td>
    <td>{props.mobile.date.substring(0,10)}</td>
    <td>{props.mobile.rating}</td>
    <td>
      <Link to={"/edit/"+props.mobile._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMobile(props.mobile._id) }}>delete</a>
    </td>
  </tr>
)

export default class MobilesLists extends Component {
  constructor(props) {
    super(props);
    this.deleteMobile = this.deleteMobile.bind(this);
    this.state = {mobiles: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/mobiles/')
     .then(response => {
       this.setState({ mobiles: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteMobile(id) {
    axios.delete('http://localhost:5000/mobiles/'+id)
      .then(res => console.log(res.data));
    this.setState({
      mobiles: this.state.mobiles.filter(el => el._id !== id)
    })
  }

  mobileList() {
    return this.state.mobiles.map(currentmobile => {
      return <Mobile mobile={currentmobile} deleteMobile={this.deleteMobile} key={currentmobile._id}/>;
    })
   }
  render() {
    
    return (
      <div>
        <div>
          <NavLink activeClassName="active" style={{float: 'right'}} value="Logout" className="btn btn-primary" to="/">Logout</NavLink>
          <NavLink activeClassName="active" className="btn btn-primary" to="/create">Create New Mobile Entry</NavLink>
        </div>
        <br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Mobilename</th>
              <th>Description</th>
              <th>Price (€)</th>
              <th>Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.mobileList() }
          </tbody>
        </table>
      </div>
    )
  }
}