import React, {useState, useEffect} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function WikiCard(props) {
//    console.log("Wiki Card", props)
  let imgStyle={
    float: 'left'
  }
const [state, setState] = useState({
    text: "loading",
    imageURL: null
})



useEffect(() => {
//    console.log("Wiki Card Two", props)
    if (!props.initialized)
    {
        return;
    }
//    console.log("Wiki Card Three", props)
    axios.get("https://api.sygictravelapi.com/1.1/en/places/list?query=" + encodeURIComponent(props.city), {
  headers: {'x-api-key': 'aOz451xNYq4V2Z8wsYDIV2lZWqBENUTK2tk1ersn'}
}).then(function (result) {
//    console.log("Wiki Card four", props.city)
  let bbResponse = result.data.data.places[0].bounding_box;
    var bBox = bbResponse.south + "," + bbResponse.west + "," + bbResponse.north + "," + bbResponse.east;
  axios.get("https://api.sygictravelapi.com/1.1/en/places/list?bounds=" + bBox + "&levels=poi", {
    headers: {'x-api-key': 'aOz451xNYq4V2Z8wsYDIV2lZWqBENUTK2tk1ersn'}
  }).then(function (result2) {
    let poiID = result2.data.data.places[0].id;
    axios.get("https://api.sygictravelapi.com/1.1/en/places/" + poiID, {
      headers: {'x-api-key': 'aOz451xNYq4V2Z8wsYDIV2lZWqBENUTK2tk1ersn'}
    }).then(function(result3) {
      let description = result3.data.data.place.description.text;
      console.log("Foo", result3.data.data.place);
      setState({
          text:description,
          imageURL: result3.data.data.place.main_media.media[0].url
          });
    });
  });
});

  }, [props]);

return (

        <div className="card horizontal z-depth-5" id="entire">
          <div className="card-image" id="bandPic">
            <img style={imgStyle} src={state.imageURL}/>
          </div>
          <div className="card-stacked">
            <div className="card-content" style={imgStyle} id="bandInfo">{state.text}</div>
            <div className="card-action">

            </div>
          </div>
        </div>
    
);}

export default WikiCard;
