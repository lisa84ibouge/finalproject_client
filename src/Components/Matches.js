import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';

function Matches(props) {


const [state, setState] = useState({
    matches: []
})


useEffect(() => {
   console.log("Matches", props)
    if (!props.initialized)
    {
        return;
    }
//    console.log("Wiki Card Three", props)
    axios.get("http://localhost:8080/matches" + encodeURIComponent(props.city), {
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
                      <div><div><b/></div><div className="profilePic" style={{backgroundSize: '100%', width: '100px', height: '100px', display: 'block', float: 'left', backgroundImage: 'url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")'}} /><span style={{verticalAlign: 'top'}}> </span></div>
                    </td>
                  </tr>
                </tbody></table>
            </span>
          </div>

    );     



    
}













export default Matches; 