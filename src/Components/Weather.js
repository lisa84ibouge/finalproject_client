import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import WeatherPlusReact from './weather-plus-react/WeatherPlusReact.jsx';

function Weather() { 
return (


          <div className="card-panel z-depth-5" style={{overflowY: 'scroll', height: '450px'}}>
          <div className="weatherPlusReactRoot">
           <WeatherPlusReact/>
          </div>
          </div>
    );
}





export default Weather;