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
        <table>
        <div key={m.id}>
        <div> </div><div style={{display: "inline-block", float: "left", paddingTop: "50px"}}>
                <div className="profilePic"
                  style={{backgroundSize: "100%", width: "150px", height: "150px", backgroundRepeat: "no-repeat",  backgroundImage: "url('" + m.photo + "')"}}>
                  
                  
                  
                </div> <div><button style={{backgroundColor: "Purple", color: "white", fontWeight: "bold", fontSize: "125%"}}onClick={()=> props.startChat(m)}>MESSAGE</button></div></div><tr><p><span style={{display: "inline-block", paddingTop: "30px", float: "left"}}><div style={{textAlign: "center", fontWeight: "bold", fontSize: "125%"}}>{m.name}</div><div><div style={{fontWeight: "bold"}}>{m.age}</div><div style={{textAlign: "center", marginLeft: "20px"}}>{m.country} from {m.city}  |  speaks {m.lang} </div> <p><div style={{display: "inline-block", float: "left", textAlign: "left", marginLeft: "25px"}}>{m.bio}</div></p> @{m.userName} </div></span></p></tr>
                <div></div>
        </div>
        </table>
        )
        console.log("Matches Divs: ", matchesDivs);
        setState({
          matches: result.data, 
          matchesDivs: matchesDivs
        })
      });
  }, [props.city, props.initialized]);

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
