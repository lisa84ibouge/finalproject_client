import React, { useState, useEffect, useRef } from "react";
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
import Chat from "./Components/Chat.js";
import Talk from "talkjs";

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
        process.env.REACT_APP_USERSERVER + "/user?email=" + props.auth.profile.name,
        { headers }
      );
      console.log("loggedin userdata:", result);
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
  
  document.getElementById("logoutButton").hidden=true;
  if (document.location.toString().match("http://www.jetsetmet.net")) {
    document.location = process.env.REACT_APP_ROOT_URL;
  }

  return (
    <div>
      <h1>Welcome, please, log in.</h1>
      <button style={{fontSize: '200%'}}onClick={props.auth.login}>Log in</button>
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
        render={() => <Callback history={props.history}auth={props.auth} />}
      />
      <Route
        exact
        path="/signup"
        render={() =>
           authenticated ? <SignUp history={props.history} auth={props.auth} /> : <Redirect to="/" />
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
  console.log("results component user", props.history.location.state.user )
  const [state, setState] = useState({
    user: props.history.location.state.user,
    coordinates: { lat: -34.397, lng: 150.644 },
    initialized: false,
    bounds: null,
    places: null
  });
  useEffect(() => {
    console.log("Use Effect", props.history.location.state);
    let chatIcon = document.getElementById("chatIcon");
    chatIcon.onclick = function() {
      props.history.push({
        pathname: "/inbox",
        state: state
      });
    };
    chatIcon.hidden = false;
    chatIcon.innerHTML = "INBOX";
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
    console.log("startChat", state);
    console.log("start chat user:", otherUser);
    setState({
      ...state,
      showChat: true,
      otherUser: otherUser
    });
  }

  return (
    <div className="ResultsComponent">
      <div>
        {" "}
        <span
          style={{
            color: "silver",
            float: "left",
            fontWeight: "bold",
            marginLeft: "15px"
          }}
        >
          Welcome, {state.user.name}!
        </span>
      </div>
      <CityUpdate
        city={state.user.cityTwo}
        updateCityTwo={updateCityTwo}
        initialized={state.initialized}
      />
      <div className="row">
        <div className="col s12 ">
          <WikiCard
            city={state.user.cityTwo}
            places={state.places}
            initialized={state.initialized}
          />
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
      {state.showChat && <Chat user={state.user} otherUser={state.otherUser} />}
    </div>
  );
}

class InboxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log("inbox Component props", props)
    this.inbox = undefined;
    this.refContainer = React.createRef();
    console.log("inboxComponent", props.history.location.state);
    const { name } = props.auth.getProfile();

    this.state = {
      user: props.history.location.state.user,
      initialized: false
    };
  }

  componentDidMount() {
    console.log("Use Effect", this.props.history.location.state);
    let chatIcon = document.getElementById("chatIcon");
    let history = this.props.history;
    let state = this.state;
    chatIcon.onclick = function() {
      history.push({
        pathname: "/results",
        state: state
      });
    };
    chatIcon.hidden = false;
    chatIcon.innerHTML = "HOME";

    Talk.ready
      .then(() => {
        let userData = {
          id: this.state.user.id,
          name: this.state.user.name,
          email: this.state.user.email,
          welcomeMessage: "Hey there! How are you? :-)"
        };
        if (this.state.user.photo) {
          userData.photoUrl = this.state.user.photo;
        }
        const me = new Talk.User(userData);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tyjb0JJP",
            me: me
          });
        }
        this.inbox = window.talkSession.createInbox();
        console.log("refContainer:", this.refContainer);
        window.inboxRef = this.refContainer;
        window.inbox = this.inbox;
        this.inbox.mount(this.refContainer.current);
      })
      .catch(e => console.error(e));
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

  render() {
    return (
      <div className="InboxComponent">
        <div ref={this.refContainer} style={{width: "90%", margin: "80px", height: "600px"}}> </div>
      </div>
    );
  }
}

export default withRouter(App);
