import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function CityUpdate (props){

  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onSubmit="event.preventDefault();">
      <div className="input-field col s12">
        <input id="query" type="text" className="input" value={props.city}/> 
        <a className="waves-effect waves-white btn-flat" id='search-btn'><i
            className="material-icons left">search</i>search</a>
      </div>
    </form>
  </div>
</div>);

}

export default CityUpdate;