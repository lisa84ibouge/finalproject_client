import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

function Landmark(props) {
  console.log("Landmark", props);
  const [state, setState] = useState({
    text: "loading",
    imageURL: null
  });

  useEffect(() => {
    //    console.log("Wiki Card Two", props)
    if (!props.initialized) {
      return;
    }
    //    console.log("Wiki Card Three", props)

    let poiID = props.places[0].id;
    axios
      .get("https://api.sygictravelapi.com/1.1/en/places/" + poiID, {
        headers: { "x-api-key": "aOz451xNYq4V2Z8wsYDIV2lZWqBENUTK2tk1ersn" }
      })
      .then(function(result3) {
        let description = result3.data.data.place.description.text;
        console.log("Landmark Foo", result3.data.data.place);
        setState({
          text: description,
          imageURL: result3.data.data.place.main_media.media[0].url
        });
      });
  }, [props]);

  return (
    <div
      className="card-panel z-depth-5"
      style={{ overflowY: "scroll", height: "450px" }}
    >
      <table>
        <thead>
          <tr>
            <th
              className="landmarkHeader"
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              <b>Top 10 Things To Do</b>
            </th>
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
