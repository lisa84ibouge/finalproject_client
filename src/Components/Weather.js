import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
import 'react-open-weather/lib/css/ReactWeather.css';

function Weather(props) { 
return (


          <div className="card-panel z-depth-5" >
            <ReactWeather
            forecast="5days"  
            apikey="d28ee5045a8541c094342319193005"
            type="geo"
            lat="48.1351"
            lon="11.5820"
            />
          </div>
    
    );
}





export default Weather;