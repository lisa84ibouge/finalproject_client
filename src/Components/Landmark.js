import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function Landmark() {


    return (



        <div className="card-panel z-depth-5" style={{overflowY: 'scroll', height: '450px'}}>
          <table>
            <thead>
              <tr>
                <th className="landmarkHeader" style={{fontSize: '150%', textAlign: 'center', fontWeight: 'bold'}}><b>Top 10 Things To Do</b></th>
              </tr>
            </thead>
          </table>
          <div className="card-content">
            <div className="row">
              <ul id="placeDetails" />
            </div>
          </div>
        </div>
    
    );

}
export default Landmark;