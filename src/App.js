import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter} from 'react-router';
import {Route, Redirect, Link} from 'react-router-dom';
import Callback from './Callback/Callback';
import SignUp from "./Components/SignUp";
import axios from "axios";
import Async from 'react-async';
import CityUpdate from './Components/CityUpdate.js';
import WikiCard from './Components/WikiCard.js';
import Matches from './Components/Matches.js';
import Map from './Components/Map.js';
import Weather from './Components/Weather.js';
import Landmark from './Components/Landmark.js';

function HomePage(props) {
  const {authenticated} = props;
  const [state, setState] = useState(
    {
      user: null
    }
  );
  
   
  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };

  if (authenticated)  {
    const {name} = props.auth.getProfile();
    console.log(props.auth);
    const headers = { authorization: 'Bearer ' + props.auth.accessToken,
    'content-type': 'application/json' } 
    console.log("headers", headers);
    async function fetchData() {
        const result = await axios(
      //  process.env.REACT_APP_USERSERVER + "/user?email=" + props.auth.getProfile() 
      "http://localhost:8080/user?email=" + props.auth.profile.name, {headers}
      );
      return result.data;
    };

    //const loadUserData = fetchData().then(function (userData) {
      //console.log("User Data", userData);
      //return userData;
    //});
      return(  
        <Async promiseFn={fetchData} > 
        {({ data, error, isLoading }) => {
         if (isLoading) return "Loading..."
         if (error) return `Something went wrong: ${error.message}`
         if (data)
        return (
          <Redirect to={{
          pathname: '/results',
          state: { user: data }
          }}/>
           )
          return <Redirect to='/signup'/>
          }}
        
        </Async>

      )
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

  return (
    <div className="App">
      <Route exact path='/callback' render={() => (
        <Callback auth={props.auth}/>
      )}/>
      <Route exact path='/signup' render={() => (
         authenticated ?(
          <SignUp auth={props.auth}/>
          
          ) : (
          <Redirect to="/"/>

         )
        
      )}/>

      <Route exact path='/results' render={() => (
         authenticated ?(
          <ResultsComponent authenticated={authenticated}
            auth={props.auth}
            history={props.history} />
          
          ) : (
          <Redirect to="/"/>

         )
        
      )}/>

      <Route exact path='/' render={() => (
        <HomePage
          authenticated={authenticated}
          auth={props.auth}
          history={props.history}
        />)
      }/>
    </div>
  );
}

function ResultsComponent(props) {
  const {name} = props.auth.getProfile();
  const [state, setState ] = useState ({
    user: {id: 0}
  })
  useEffect(() => {
    console.log("Use Effect", props.history.location.state);
    setState(props.history.location.state)
  });
  return (
    <div className="ResultsComponent">
    <div> {state.user.id} </div>
    <CityUpdate city={""}/>
    <div className="row">
    <div className="col s12 ">
    <WikiCard/>
    </div>
    </div>
    <div className="row">
    <div className="col s6 m6" id="col1">
    <Matches/>
    
    </div>
    <div className="col s6 m6" id="col2">
    <Map/>
    </div>
    </div>

     <div className="row">
    <div className="col s6 m6" id="col1">
    <Weather/>
    
    </div>
    <div className="col s6 m6" id="col2">
    <Landmark/>
    </div>
    </div>
    
    </div>
  );
}





export default withRouter (App);
