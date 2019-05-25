import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function CityUpdate (props){

  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onSubmit="event.preventDefault();">
      <div className="input-field col s12">
        <input id="query" type="text" className="input" style={{color: 'silver'}} value={props.city}/> 
        <a className="waves-effect waves-white btn-flat" id='search-btn' style={{color: 'silver', fontWeight: "bold"}}><i
            className="material-icons left">search</i>Update</a>
      </div>
    </form>
  </div>
</div>);

}

export default CityUpdate;