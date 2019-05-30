import React from "react";

const Day = (props) => {
  if(props.humidity != null){
    return(
      <div className="statistics">
        <h1>Statistics</h1>

        <div className="stat" id="humidity">
          <img src="weather-plus-react/img/humidity.jpg" alt="icon"/>
          <p>{props.humidity}%</p>
        </div>
        <div className="stat" id="pressure">
          <img src="weather-plus-react/img/pressure.jpg" alt="icon"/>
          <p>{props.pressure } hPa</p>
        </div>
        <div className="stat" id="wind">
          <img src="weather-plus-react/img/wind.jpg" alt="icon"/>
          <p>{props.wind} mph</p>
        </div>
        <div className="stat" id="cloud">
          <img src="weather-plus-react/img/cloud.jpg" alt="icon"/>
          <p>{props.cloud}%</p>
        </div>
      </div>
    );
  }

  else{
    return (null);
  }
}

export default Day;
