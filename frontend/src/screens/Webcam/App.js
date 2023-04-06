// import all the nessasary components
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../components/sidebar'; // import components
import farshid from '../../assets/farshid.png';
import Chat from '../../components/chat';
import Profile from '../../components/profile';

import { NavLink, Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

function Video() {
  const [key, setKey] = useState("") // Keyboard inputs
  const [faces, setFaces] = useState([]) // Face detection
  const { user, logOut } = UserAuth(); 
  const [name, setName] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
 
  const dataset = () => { //connenct with the backend database
    console.log("SUCCESS data")
    axios.get("http://localhost:8080/data").then((res) => console.log(res)).catch((err) => console.log(err))
  }

  const train = () => { // connenct to the backend to train new faces
    console.log("SUCCESS train")
    axios.get("http://localhost:8080/train").then((res) => console.log(res)).catch((err) => console.log(err)) // post to backend
    window.location.reload(false);
  }

  const handleSignOut = async () => { // logout button
    try {
      await logOut();
      Navigate('/signin');
    } catch (error) {
      console.log(error)
    }
  }

  function refreshPage() { //state when the user refreshes the bage
    window.location.reload(false);
  }

  const handleUserSubmit = (e) => { //user input to the page
    console.log("SUCCESS name", name)
    //axios.get("http://localhost:8080/name").then((res) => console.log(res)).catch((err) => console.log(err))
    axios.post("http://localhost:8080/name", {name: name}).then(response=> console.log("repsonse", response.status)) // post to the backend
  };


  return ( // HTML compoenent of the page
    <div className="VideoPage">
      <Sidebar />
      <div className="VideoContent"> // the webcam video component of the page
        <div className="VideoHeader">
          <div className="HeaderTitle">Webcam View</div>
          <div className='Signin'> // signin compoenet of the page
                {user?.displayName ? (
                    <button className="Signin" onClick={handleSignOut}>Logout</button>
                ) : (
                    <button className="Signin"> <Link to='/signin'>Sign in</Link> </button>
                )}
              </div> 
        </div>
        <div className="VideoBody"> // the webcam compoenet 
          <div className="VideoBodyLeft">
            <div className="VideoComponent">
              <img src='http://localhost:8080/webcam_feed' alt='video'/>
            </div>
            <div className="VideoDescription" style= {{
              paddingTop: '3%',
            }}>
              <div style={{
                fontSize: '35px',
                fontWeight: 'bold',
                color: 'white',
              }}> Controls </div>
              <div className="ProfileCard" style={{
                  backgroundColor: "#29282E"
              }}>
                  <div className="CardDescription">
                    <div className='Signin'> // the dataset buttons to collect data
                      <button onClick={() => dataset()}>Collect Dataset</button>
                      <button onClick={() => train()}>Train Dataset</button>
                      <button onClick={() => refreshPage()}>Load Dataset</button>
                      <form onSubmit={handleUserSubmit}>
                      <input
                        className="LoginInput"
                        placeholder="Enter Name"
                        type={"name"}
                        onChange={handleNameChange}
                      ></input>
                      <button onClick={handleUserSubmit}>
                        Submit Name
                      </button>
                    </form>
                      </div>
                  </div>
                  <div className="CardProfile">
                      Test
                  </div>
              </div>
            </div>
          </div>
          <div className="VideoBodyRight">
            <div className="VideoInfo"> 
              <div style={{
                    fontSize: '35px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '5%',
                  }}> Profiles </div>
              </div>
              <div style= {{
                marginTop: '5%',
              }}>// the profile on the side
                <Profile name="Martin Tang" /> 
                <Profile name="Kenn Du" />
                <Profile name="Ray Ho" />
                <Profile name="David Lee" />
                <Profile name="Ian Park" />
              </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Video;

