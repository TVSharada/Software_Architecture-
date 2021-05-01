
import React, { Component } from 'react';
import axios from 'axios';


export default class EditMobilelist extends Component {
  constructor(props){
    super(props);

    this.onChangeMobilename = this.onChangeMobilename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state= {
      mobilename: '',
      description: '',
      price: 0,
      date: new Date(),
      rating: 0,
      users: []
    }
  }

  componentDidMount(){
    
    axios.get('http://localhost:5000/mobiles/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        mobilename: response.data.mobilename,
        description: response.data.description,
        price: response.data.price,
        date: new Date(response.data.date),
        rating: response.data.rating
      })   
    })
    .catch(function (error) {
      console.log(error);
    })


    axios.get('http://localhost/:5000/mobiles/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({ 
          users: response.data.map(user => user.username),
        })
      }
    })
  } 
    
  onChangeMobilename(e) {
    this.setState({
      mobilename: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onChangeRating(e) {
    this.setState({
       rating: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newMobile={
      mobilename: this.state.mobilename,
      description: this.state.description,
      price: this.state.price,
      date: this.state.date,
      rating:this.state.rating

    }

    console.log(newMobile);

    
    axios.post('http://localhost:5000/mobiles/update/'+this.props.match.params.id, newMobile)
      .then(res => {
        console.log(res.data)
        this.props.history.push('/mobiles');
      });

  }
  render() {
    return (
      <div>
      <h3>Edit Entry</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Mobilename: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.mobilename}
              onChange={this.onChangeMobilename}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Price (in euros): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input 
              type="date" 
              className="form-control"
              value={this.state.date}
              onChange={this.onChangeDate}
              />
        </div>
        <div className="form-group">
          <label>Rating: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.rating}
              onChange={this.onChangeRating}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}