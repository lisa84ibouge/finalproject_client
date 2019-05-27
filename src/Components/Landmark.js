import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

function Landmark(props) {
  console.log("Landmark", props);
  const [state, setState] = useState({
    landmarkRows: null
  });

  useEffect(() => {
    //    console.log("Wiki Card Two", props)
    if (!props.initialized) {
      return;
    }
    //    console.log("Wiki Card Three", props)
    const landmarkRows = props.places.map((m) => 
      <tr>
        <td>
          <img src={m.thumbnail_url}/>
        </td>
        <td>{m.name}</td>
        <td>{m.perex}</td>
      </tr>
    )
    setState({
      landmarkRows: landmarkRows
    
    })
  }, [props])

    /*for (var i = 0; i < data.data.places.length; i++) {
      var name = data.data.places[i].name;
      var perex = data.data.places[i].perex;
      var thumbnail = data.data.places[i].thumbnail_url;
      var poiID = data.data.places[i].id;
      if (i == 0) {
        contentSearch(poiID);
      }
      var newTableRow = $("<tr>");
      var imageCell = $("<td>")
      var image = $('<img />', {
        src: thumbnail
      }).appendTo(imageCell);
      var nameCell = $("<td>").text(name);
      var perexCell = $("<td>").text(perex);
      // var thumbnailCell = $("<td>").html(thumbnail);
      $(newTableRow).append(nameCell, perexCell, imageCell)
      tableObject.append(newTableRow);
    
    }
*/


  return (
   
    <div className="card-panel z-depth-5"
      style={{ overflowY: "scroll", height: "450px" }}>
      <span
              className="landmarkHeader"
              style={{
                fontSize: "150%",
                textAlign: "center",
                fontWeight: "bold"
              
              }}
            >
              <b>Top 10 Things To Do</b>
            </span>
      <table>
        <thead>
          <tr>
          
          </tr>
        </thead>
              <tbody>
                {state.landmarkRows}
              </tbody>
      </table>
    </div>
   
  );
            }          
export default Landmark;
