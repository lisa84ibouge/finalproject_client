import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

function Matches(props) {
  const [state, setState] = useState({
    matches: [],
    matchesDivs: ""
  });

  useEffect(() => {
    console.log("Matches", props);
    if (!props.initialized) {
      return;
    }
    //    console.log("Wiki Card Three", props)
    const headers = {
      authorization: "Bearer " + props.auth.accessToken,
      "content-type": "application/json"
    };
    axios
      .get("http://localhost:8080/matches?city=" + encodeURIComponent(props.city), { headers })
      .then(function(result) {
        console.log("Matches Two: ", result)
        const matchesDivs = result.data.map((m) => 
        
        <div key={m.id}>
        <div>{m.name} {m.age} </div>
                <div className="profilePic"
                  style={{backgroundSize: "100%", width: "150px", height: "150px", backgroundRepeat: "no-repeat", display: "inline-block", float: "left",  backgroundImage: "url('" + m.photo + "')"}}>
                </div> <span>{m.lang} {m.bio} {m.city} {m.country} {m.userName} {m.email}</span>
                <div></div>
        </div>
        
        )
        console.log("Matches Divs: ", matchesDivs);
        setState({
          matches: result.data, 
          matchesDivs: matchesDivs
        })
      });
  }, [props]);

  return (
    <div
      className="card-panel z-depth-5"
      style={{ overflowY: "scroll", height: "450px" }}
    >
      <span className="black-text" id="eventsGoHere">
        {/* Event Table */}
        <table>
          <thead>
            <tr>
              <th
                className="friendHeader"
                style={{
                  textAlign: "center",
                  fontSize: "150%",
                  fontWeight: "bold"
                }}
              >
                <b>New Friends from this Area</b>
              </th>
            </tr>
          </thead>
          </table>
        {state.matchesDivs}
      </span>
    </div>
  );
}

export default Matches;
