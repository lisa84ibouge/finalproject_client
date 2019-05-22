import React, {useState} from "react";
import {Redirect} from 'react-router';
import axios from 'axios';


function SignUp (props) {
    const [state, setState] = useState ({
        fireRedirect: false
    })
    let submitForm = (e) => {
        e.preventDefault();
        const headers = { authorization: 'Bearer ' + props.auth.accessToken,
        'content-type': 'application/json' } 
        const body = {email: "asdf@u.washington.edu",
                      cityTwo: "Paris", 
                     name: 'lisa84', 
                     photo: "ASDF", 
                     city: "Redmond", 
                     countryTwo: "France"
                    }
            axios.post(
              "http://localhost:8080/users", body, {headers}
            ).then(function (result){
                console.log(result.data);
                setState({fireRedirect: true, user: result.data});
            });
            
      //  setState({fireRedirect: true})
    }
    return (
        <div>
        <form onSubmit={submitForm}>
        <div>
          <h4 className="ui dividing header">Personal Information</h4>
          <div className="ui form">
            <div className="three fields">
              <div className="field">
                <label>First Name:</label>
                <input name="name" type="text" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Last Name:</label>
                <input name="lastName" type="text" placeholder="Last Name" />
              </div>
              <div className="field">
                <label>Picture:</label>
                <input name="photo" type="text" placeholder="Personal Photo" />
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>Age:</label>
                <input name="age" type="number" placeholder="Age" />
              </div>
              <div className="field">
                <label>Gender:</label>
                <select>
                  <option value>Gender</option>
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </div>
              <div className="field">
                <label>Primary Language:</label>
                <input name="lang" type="text" placeholder="Language Spoken" />
              </div>
            </div>
            <br />
            <br />
              <h4 className="ui dividing header">Personal Information</h4>
              <div className="ui form">
                <div className="three fields">
                  <div className="field">
                    <label>First Name:</label>
                    <input name="name" type="text" placeholder="First Name" />
                  </div>
                  <div className="field">
                    <label>Last Name:</label>
                    <input name="lastName" type="text" placeholder="Last Name" />
                  </div>
                  <div className="field">
                    <label>Picture:</label>
                    <input name="photo" type="text" placeholder="Personal Photo" />
                  </div>
                </div>
                <div className="three fields">
                  <div className="field">
                    <label>Age:</label>
                    <input name="age" type="number" placeholder="Age" />
                  </div>
                  <div className="field">
                    <label>Gender:</label>
                    <select>
                      <option value>Gender</option>
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Primary Language:</label>
                    <input name="lang" type="text" placeholder="Language Spoken" />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>City:</label>
                    <input name="city" type="text" placeholder="City" />
                  </div>
                  <div className="field">
                    <label>Country:</label>
                    <input type="text" placeholder="Country" />
                  </div>
                </div>
                <div className="field">
                  <label>Biography:</label>
                  <textarea name="bio" defaultValue={""} />
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Username:</label>
                    <input name="username" type="text" placeholder="Username" />
                  </div>
                  <div className="field">
                    <label>Email Address:</label>
                    <input name="email" type="text" placeholder="email@address.com" />
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
                  <input name="cityTwo" type="text" placeholder="City" />
                </div>
                <div className="required field">
                  <label>Country:</label>
                  <input name="countryTwo" type="text" placeholder="Country" />
                </div>
              </div>
              {/*optional*/}
              <div className="two fields">
                <div className="field">
                  <label>City:</label>
                  <input type="text" name="City" placeholder="City" />
                </div>
                <div className="field">
                  <label>Country:</label>
                  <input type="text" name="Country" placeholder="Country" />
                </div>
              </div>
             
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