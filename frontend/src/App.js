import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';

import Video from './screens/Video/App';
import Webcam from './screens/Webcam/App';
import Signin from './screens/Signin/App';
import ProfilePage from './screens/Profile/App';

function App() {

  return (
    <Router >
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Video />} />
          <Route exact path="/webcam" element={<Webcam />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/Profile' element={<ProfilePage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}
export default App;

