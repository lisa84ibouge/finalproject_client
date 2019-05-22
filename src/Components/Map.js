import React, {useState} from "react";
import {Redirect} from 'react-router';
import GoogleMapReact from 'google-map-react';


function Map(props) {


const [state, setState] = useState({
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      
});

return (

        <div className="card-panel z-depth-5" style={{overflowY: 'scroll', height: '450px'}}>
          <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAvaMUPWVWbf-IfNSQxrrcoYaQ7TpVrSVM' }}
          defaultCenter={state.center}
          defaultZoom={state.zoom}
        />
        </div>
)

}





export default Map;
