import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "react-router";
import { Route, Redirect, Link } from "react-router-dom";
import Callback from "./Callback/Callback";
import SignUp from "./Components/SignUp";
import axios from "axios";
import Async from "react-async";
import CityUpdate from "./Components/CityUpdate.js";
import WikiCard from "./Components/WikiCard.js";
import Matches from "./Components/Matches.js";
import Map from "./Components/Map.js";
import Weather from "./Components/Weather.js";
import Landmark from "./Components/Landmark.js";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Chat from './Components/Chat.js';

function HomePage(props) {
  const { authenticated } = props;
  const [state, setState] = useState({
    user: null
  });

  const logout = () => {
    props.auth.logout();
    props.history.push("/");
  };

  if (authenticated) {
    const { name } = props.auth.getProfile();
    console.log(props.auth);
    const headers = {
      authorization: "Bearer " + props.auth.accessToken,
      "content-type": "application/json"
    };
    console.log("headers", headers);
    async function fetchData() {
      const result = await axios(
        //  process.env.REACT_APP_USERSERVER + "/user?email=" + props.auth.getProfile()
        "http://localhost:8080/user?email=" + props.auth.profile.name,
        { headers }
      );
      console.log('loggedin userdata:', result)
      return result.data;
    }

    //const loadUserData = fetchData().then(function (userData) {
    //console.log("User Data", userData);
    //return userData;
    //});
    return (
      <Async promiseFn={fetchData}>
        {({ data, error, isLoading }) => {
          if (isLoading) return "Loading...";
          if (error) return `Something went wrong: ${error.message}`;
          if (data)
            return (
              <Redirect
                to={{
                  pathname: "/results",
                  state: { user: data }
                }}
              />
            );
          return <Redirect to="/signup" />;
        }}
      </Async>
    );
    /* if (userData.data) {
      return ( <ResultsComponent authenticated={authenticated}
          auth={props.auth}
          history={props.history}
    />)
    } else {
      return ( <Redirect to="/signup" />)
    }
    */
  }

  return (
    <div>
      <h1>I don't know you. Please, log in.</h1>
      <button onClick={props.auth.login}>Log in</button>
    </div>
  );
}

function App(props) {
  const authenticated = props.auth.isAuthenticated();
  console.log("Bearer Token: " + props.auth.accessToken);
  return (
    <div className="App">
      <Route
        exact
        path="/callback"
        render={() => <Callback auth={props.auth} />}
      />
      <Route
        exact
        path="/signup"
        render={() =>
          authenticated ? <SignUp auth={props.auth} /> : <Redirect to="/" />
        }
      />

      <Route
        exact
        path="/results"
        render={() =>
          authenticated ? (
            <ResultsComponent
              authenticated={authenticated}
              auth={props.auth}
              history={props.history}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />

    <Route
        exact
        path="/inbox"
        render={() =>
          authenticated ? (
            <InboxComponent
              authenticated={authenticated}
              auth={props.auth}
              history={props.history}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />

      <Route
        exact
        path="/"
        render={() => (
          <HomePage
            authenticated={authenticated}
            auth={props.auth}
            history={props.history}
          />
        )}
      />
    </div>
  );
}

function ResultsComponent(props) {
  const { name } = props.auth.getProfile();
  const [state, setState] = useState({
    user:  props.history.location.state.user,
    coordinates: { lat: -34.397, lng: 150.644 },
    initialized: false,
    bounds: null,
    places: null
  });
  useEffect(() => {
    console.log("Use Effect", props.history.location.state);
    let chatIcon = document.getElementById("chatIcon");
      chatIcon.onclick=function(){
      props.history.push({
        pathname: '/inbox', 
        state: state 
      }
        ) 
    }
    chatIcon.hidden = false;
    chatIcon.innerHTML = "INBOX"
    const fetchCoordData = async () => {
      const result = await axios(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          state.user.cityTwo +
          "&key=AIzaSyAvaMUPWVWbf-IfNSQxrrcoYaQ7TpVrSVM"
      );
      console.log("Results", result);
      let coordinate = {
        lat: result.data.results[0].geometry.location.lat,
        lng: result.data.results[0].geometry.location.lng
      };
      let bounds = result.data.results[0].geometry.bounds;

      var bBox =
        bounds.southwest.lat +
        "," +
        bounds.southwest.lng +
        "," +
        bounds.northeast.lat +
        "," +
        bounds.northeast.lng;

      const placesResult = await axios(
        "https://api.sygictravelapi.com/1.1/en/places/list?bounds=" +
          bBox +
          "&levels=poi",
        {
          headers: { "x-api-key": "aOz451xNYq4V2Z8wsYDIV2lZWqBENUTK2tk1ersn" }
        }
      );
      setState({
        user: state.user,
        coordinates: coordinate,
        bounds: bounds,
        places: placesResult.data.data.places,
        initialized: true, 
        showChat: false
      });

      //setState({user: state.user, coordinates: {result.data}});
    };
    fetchCoordData();
  }, [state.user.cityTwo]);

  function updateCityTwo(city) {
      setState({
        user: {
          ...state.user, 
          cityTwo: city
        }
      });


  }

  function startChat(otherUser) {
    console.log("startChat", state)
    console.log("start chat user:", otherUser)
    setState({
     ...state, 
     showChat: true,
     otherUser: otherUser
     
    });


}


  return (
    <div className="ResultsComponent">
      <div> <span style={{color: 'silver', float: 'left', fontWeight: 'bold', marginLeft: '15px'}}>Welcome back, {state.user.name}!</span></div>
      <CityUpdate city={state.user.cityTwo} updateCityTwo={updateCityTwo} initialized={state.initialized} />
      <div className="row">
        <div className="col s12 ">
          <WikiCard city={state.user.cityTwo} places={state.places} initialized={state.initialized} />
        </div>
      </div>
      <div className="row">
        <div className="col s6 m6" id="col1">
          <Matches
            auth={props.auth}
            city={state.user.cityTwo}
            initialized={state.initialized}
            startChat={startChat}
          />
        </div>
        <div className="col s6 m6" id="col2">
          <Map center={state.coordinates} />
        </div>
      </div>

      <div className="row">
        <div className="col s6 m6" id="col1">
          <Weather />
        </div>
        <div className="col s6 m6" id="col2">
          <Landmark
            city={state.user.cityTwo}
            bounds={state.bounds}
            places={state.places}
            initialized={state.initialized}
          />
        </div>
      </div>
      {state.showChat && <Chat
        user={state.user}
        otherUser={state.otherUser}

      />}
    </div>
  );
}


function InboxComponent(props) {
  console.log("inboxComponent", props.history.location.state)
  const { name } = props.auth.getProfile();
  const [state, setState] = useState({
    user:  props.history.location.state.user,
    initialized: false,
  });
  useEffect(() => {
    console.log("Use Effect", props.history.location.state);
    let chatIcon = document.getElementById("chatIcon");
      chatIcon.onclick=function(){
        props.history.push({
          pathname: '/results', 
          state: state 
        })
    }
    chatIcon.hidden = false;
    chatIcon.innerHTML = "HOME"
   
  }, []);


  return (
    <div className="InboxComponent">
      HI
    </div>
  );
}

export default withRouter(App);
