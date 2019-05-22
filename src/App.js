import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter} from 'react-router';
import {Route, Redirect, Link} from 'react-router-dom';
import Callback from './Callback/Callback';
import SignUp from "./Components/SignUp";
import axios from "axios";
import Async from 'react-async';

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
    <CitySearch city={""}/>
    <WikiCard/>
    </div>
  );
}

function CitySearch (props){

  return ( 
  <div className="row">
  <div className="input-field col s12 z-depth-5" id="searchBox">
    <form id="searchFormEvent" onSubmit="event.preventDefault();">
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
