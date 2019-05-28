import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function SignUp (props) {
    const [state, setState] = useState ({
        fireRedirect: false, newUser: {
        }
    })
    const updateField = e => {
    setState( {fireRedirect: false, newUser: {
      ...state.newUser,
      [e.target.name]: e.target.value
    }});
  };

    let submitForm = (e) => {
        e.preventDefault();
        const headers = { authorization: 'Bearer ' + props.auth.accessToken,
        'content-type': 'application/json' } 
                   console.log("submitted form data: ", state.newUser);
            axios.post(
              process.env.REACT_APP_USERSERVER + "/users", state.newUser, {headers}
            ).then(function (result){
                console.log(result.data);
                setState({fireRedirect: true, user: result.data});
            });
            
      //  setState({fireRedirect: true})
    }
    return (
        <div>
        <form onSubmit={submitForm} method="POST">
        <div>
         
              <h4 className="ui dividing header">Personal Information</h4>
              <div className="ui form">
                <div className="three fields">
                  <div className="field">
                    <label>First Name:</label>
                    <input onChange={updateField} name="name" type="text" placeholder="First Name" />
                  </div>
                  <div className="field">
                    <label>Last Name:</label>
                    <input onChange={updateField} name="lastName" type="text" placeholder="Last Name" />
                  </div>
                  <div className="field">
                    <label>Picture:</label>
                    <input onChange={updateField} name="photo" type="text" placeholder="Personal Photo" />
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>Age:</label>
                    <input onChange={updateField} name="age" type="number" placeholder="Age" />
                  </div>
                  <div className="field">
                    <label>Gender:</label>
                    <select className="browser-default" name="gender" onChange={updateField}>
                      <option value>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Primary Language:</label>
                    <input onChange={updateField} name="lang" type="text" placeholder="Language Spoken" />
                  </div>
                {/*</div>*/}
                <div className="two fields">
                  <div className="field">
                    <label>City:</label>
                    <input onChange={updateField} name="city" type="text" placeholder="City" />
                  </div>
                  <div className="field">
                    <label>Country:</label>
                    <input onChange={updateField} type="text" placeholder="Country" />
                  </div>
                </div>
                <div className="field">
                  <label>Biography:</label>
                  <textarea onChange={updateField} name="bio" defaultValue="" />
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Username:</label>
                    <input onChange={updateField} name="username" type="text" placeholder="Username" />
                  </div>
                  <div className="field">
                    <label>Email Address:</label>
                    <input onChange={updateField} name="email" type="text" placeholder={props.auth.profile.name} />
                  </div>
                </div>
              </div>
           </div>
          <h4 className="ui dividing header">Desired Destination</h4>
          <div className="ui form">
            <div className="field">
              <div className="two fields">
                <div className="required field">
                  <label>City Two:</label>
                  <input onChange={updateField} name="cityTwo" type="text" placeholder="City" />
                </div>
                <div className="required field">
                  <label>Country Two:</label>
                  <input onChange={updateField} name="countryTwo" type="text" placeholder="Country" />
                </div>
              </div>
              {/*optional*/}
      
             
            </div>
          </div>
          <input type="submit" id="submit" className="ui submit button" />
          
        </div>
        </form>
        {state.fireRedirect && (
            <Redirect to={{
             pathname: '/results',
             state: { user: state.userData }
            }}/>
        )}
        </div>
      );
   

}

export default SignUp;