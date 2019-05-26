import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';

class CityUpdate extends React.Component{

  constructor(props) {
    super(props)
//    this.city = React.createRef();
    this.state={city: props.city}
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleChange(event){
    console.log("handleChange:", event.target.value)
    this.setState({city: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateCityTwo(this.state.city)
  }
  render() {
  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onSubmit={this.handleSubmit}>
      <div className="input-field col s12">
        <input id="query" type="text" className="input" style={{color: 'silver'}} value={this.state.city} onChange={this.handleChange}/> 
        <a className="waves-effect waves-white btn-flat" id='search-btn' style={{color: 'silver', fontWeight: "bold"}}><i
            className="material-icons left">search</i>Update</a>
      </div>
    </form>
  </div>
</div>);
  }
}

/*
function CityUpdate(props) {
  
  function handleSubmit(event) {
    event.preventDefault();
    this.props.updateCityTwo(this._city.value)
  }

  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onSubmit="{handleSubmit}">
      <div className="input-field col s12">
        <input id="query" type="text" className="input" style={{color: 'silver'}} value={props.city}/> 
        <a className="waves-effect waves-white btn-flat" id='search-btn' style={{color: 'silver', fontWeight: "bold"}}><i
            className="material-icons left">search</i>Update</a>
      </div>
    </form>
  </div>
</div>
);
  }
*/

export default CityUpdate;