// This code is a functional component for the Profile Page of a video chatting application.
// It imports necessary modules such as React, axios, and components such as Sidebar, Chat, and Profile.
// It also imports context from the AuthContext module, which provides user authentication functionality.
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing components and context
import Sidebar from '../../components/sidebar';
import farshid from '../../assets/farshid.png';
import Chat from '../../components/chat';
import Profile from '../../components/profile';
import { NavLink, Link, Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

function ProfilePage() {
  // State variables
  const [key, setKey] = useState(""); // Keyboard inputs
  const [faces, setFaces] = useState([]); // Face detection
  const { user, logOut } = UserAuth();// Destructures user and logOut methods from the 
  const [name, setName] = useState("");// Initializes a state variable for the user's name

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await logOut();
      Navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="VideoPage">
      <Sidebar />
      <div className="VideoContent">
        <div className="VideoHeader">
          <div className="HeaderTitle">Profile</div>
          <div className='Signin'>
            {/* Render the Logout button if user is signed in, otherwise render the Sign in button */}
            {user?.displayName ? (
              <button className="Signin" onClick={handleSignOut}>Logout</button>
            ) : (
              <button className="Signin"> <Link to='/signin'>Sign in</Link> </button>
            )}
          </div>
        </div>
        <div className="VideoBody">
          <div className="VideoBodyLeft">
            <div className="CardDescription">
              <div className='Signin'>
                Welcome {user?.displayName}!
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
        <div style={{
          marginTop: '5%',
        }}>
          {/* Render multiple Profile components with different names */}
          <Profile name="Martin Tang" />
          <Profile name="Kenn Du" />
          <Profile name="Ray Ho" />
          <Profile name="David Lee" />
          <Profile name="Ian Park" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
