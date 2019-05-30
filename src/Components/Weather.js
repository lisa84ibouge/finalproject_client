import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
import 'react-open-weather/lib/css/ReactWeather.css';

function Weather(props) { 
  const [state, setState] = useState({
    cityTwo: props.cityTwo,
    center: props.center
  });
 

  useEffect(() => {
    if (!props.initialized) {
      return;
    } 
    setState({
      center: props.center,
      cityTwo: props.cityTwo
    });
  }, [props]);
  console.log("WEATHER: ", state.center)
return (


          <div className="card-panel z-depth-5" style={{}} >
            <ReactWeather
            forecast="5days"  
            apikey="d28ee5045a8541c094342319193005"
            type="city"
            city={state.cityTwo}
            
            />
          </div>
    
    );
}





export default Weather;