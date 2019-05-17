import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter} from 'react-router';
import {Route, Redirect, Link} from 'react-router-dom';
import Callback from './Callback/Callback';
import SignUp from "./Components/SignUp";
import axios from "axios";


function HomePage(props) {
  const {authenticated} = props;
  const [state, setState] = useState(
    {
      user: null
    }
  );
  
    const fetchData = async () => {
      const result = await axios(
        'http://hn.algolia.com/api/v1/search?query=redux',
      );
      console.log(result.data);
      return result.data;
    };

    let userData = fetchData();

  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };
  userData = null 
  if (authenticated)  {
    const {name} = props.auth.getProfile();
    if (userData) {
      return ( <ResultsComponent authenticated={authenticated}
          auth={props.auth}
          history={props.history}
    />)
    } else {
      return ( <Redirect to="/signup" />)
    }
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
  const [city, setCity ] = useState ("Paris")
  return (
    <div className="App">
    <div> {name} </div>
    <CitySearch city={city}/>
    <WikiCard/>
    </div>
  );
}

function CitySearch (props){

  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onsubmit="event.preventDefault();">
      <div className="input-field col s12">
        <input id="query" type="text" className="input" value={props.city}/> 
        <a className="waves-effect waves-white btn-flat" id='search-btn'><i
            className="material-icons left">search</i>search</a>
      </div>
    </form>
  </div>
</div>);

}
function WikiCard() {
  let imgStyle={
    float: 'left'
  }
return (
<div className="row">
    <div className="col s12 ">
        <div className="card horizontal z-depth-5" id="entire">
          <div className="card-image" id="bandPic">
            <img style={imgStyle} src=""/>
          </div>
          <div className="card-stacked">
            <div className="card-content" style={imgStyle} id="bandInfo"></div>
            <div className="card-action">

            </div>
          </div>
        </div>
      </div>
    </div>

);}



export default withRouter (App);
