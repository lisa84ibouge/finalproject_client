import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function WikiCard(props) {
  let imgStyle={
    float: 'left'
  }
return (

        <div className="card horizontal z-depth-5" id="entire">
          <div className="card-image" id="bandPic">
            <img style={imgStyle} src=""/>
          </div>
          <div className="card-stacked">
            <div className="card-content" style={imgStyle} id="bandInfo"></div>
            <div className="card-action">

            </div>
          </div>
        </div>
    
);}

export default WikiCard;
