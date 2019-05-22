import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';

function Matches(props) {

    return (

        
          <div className="card-panel z-depth-5" style={{overflowY: 'scroll', height: '450px'}}>
            <span className="black-text" id="eventsGoHere">
              {/* Event Table */}
              <table>
                <thead>
                  <tr>
                    <th className="friendHeader" style={{textAlign: 'center', fontSize: '150%', fontWeight: 'bold'}}><b>New Friends from this Area</b></th>
                  </tr>
                </thead>
                <tbody id="appendtome" className="striped" />
                <tbody><tr><td>
                      <div> <div><b /> </div><div className="profilePic" style={{backgroundSize: '100%', width: '100px', height: '100px', display: 'block', float: 'left', backgroundImage: 'url("")'}} /><span style={{verticalAlign: 'top'}}> </span></div>
                    </td>
                  </tr>
                </tbody></table>
            </span>
          </div>

    );     



    
}













export default Matches; 