import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../components/sidebar';
import farshid from '../../assets/farshid.png';
import Chat from '../../components/chat';
import Profile from '../../components/profile';

import { NavLink, Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

function Video() {
  const [key, setKey] = useState("") // Keyboard inputs
  const [faces, setFaces] = useState([]) // Face detection
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => { // Add the logout button
    try {
      await logOut();
      Navigate('/signin');
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => { // key detection

    // KEYS LAYOUT
    const keypressRecords = [];
    document.addEventListener('keydown', (e) => {   // Once the keypress is detected
      
      if (e.repeat)
        return
      if (e.key.toLowerCase() === 'w' || e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'd' || e.key === ' ') {
        //post the key to the backend
        axios.post("key/" + e.key).then((res) => console.log(res)).catch((err) => console.log(err))
        setKey(e.key.toLowerCase())
        const record = {
          char: e.char || e.charCode,
          key: e.key
        };
        keypressRecords.push(record);
        const element = document.getElementsByClassName(e.key === ' ' ? "space" : e.key)[0]; // change the style of buttons once they are pressed to indicate they are
        if (element) {
          element.style.backgroundColor = '#4d4dff';
          element.style.transform = 'translateY(1px)';
          element.style.boxShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
        }

      }
    }, false);

    document.addEventListener('keyup', (e) => { // once the user is done pressing the button
      
      const key = e.key.toLowerCase();
      if (e.key.toLowerCase() === 'w' || e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'd') {
        // post that the button is now unpressed to the backend.
        axios.post("key/" + "b").then((res) => console.log(res)).catch((err) => console.log(err))      
      
      keypressRecords.forEach((record) => {
        if (record.key.toLowerCase() === key || record.key === ' ') {
          const element = document.getElementsByClassName(e.key === ' ' ? "space" : e.key)[0]; // revert the button style to its original
          if (element) {
            element.style.backgroundColor = '#7c7dff';
            element.style.transform = 'translateY(-1px)';
            element.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
          }
          }
        });
      }
    }, false)
  }, [])


  return ( // main page
    <div className="VideoPage">
      <Sidebar />
      <div className="VideoContent"> 
        <div className="VideoHeader">
          <div className="HeaderTitle"> Car First Person View</div>
          <div className='Signin'>
            {user?.displayName ? (
                <button className="Signin" onClick={handleSignOut}>Logout</button>
            ) : (
                <button className="Signin"> <Link to='/signin'>Sign in</Link> </button>
            )}
          </div> 
        </div>
        <div className="VideoBody">
          <div className="VideoBodyLeft">
            <div className="VideoComponent">
              <img src='http://localhost:8080/video_feed' alt='video'/>
            </div>
            <div className="VideoDescription" style= {{
              paddingTop: '3%',
            }}>
              <div style={{
                fontSize: '35px',
                fontWeight: 'bold',
                color: 'white',
              }}> Messages </div>
            </div>
          </div>
          <div className="VideoBodyRight">
            <div className="VideoControl">
              <div style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                  color: 'white',
                }}> Controls </div>
              <div className="ControlContainer">
              <div className="ControlOutput"> {key === ' ' ? "SPACE" : key.toUpperCase()} </div>
                <button className="w">W</button>
                <div className="WASDContainer">
                  <button className="a">A</button>
                  <button className="s">S</button>
                  <button className="d">D</button>
                </div>
                <button className="space" style={{
                  marginTop: '10px',
                }} >SPACE</button>
              </div>
            </div>
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
              }}>
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

