import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function Weather() { 
return (


          <div className="card-panel z-depth-5">
            <span className="black-text" id="eventsGoHere">
              {/* Event Table */}
              <table>
                <thead>
                  <tr>
                    <th style={{textAlign: 'center', fontWeight: 'bold', fontSize: '150%'}}><b>Flights to this Location</b></th>
                  </tr>
                </thead>
                <tbody id="appendtome" className="striped">
                </tbody>
              </table>
            </span>
          </div>
    
    );
}





export default Weather;