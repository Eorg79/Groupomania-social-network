
//import './App.css';
import React, { useState } from 'react';
import Routes from "./components/Routes/Index";
import { AuthContext } from './utils/AuthContext';
import axios from 'axios';

const App = () => {

  
  axios.interceptors.request.use(
  config => {
    config.headers.authorization= `Bearer ${localStorage.getItem('token')}`;
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

  const [authStatus, setAuthStatus] = useState({
    firstname:"",
    name: "",
    position: "",
    image: "",
    userId: 0,
    role:"",
    status: false,
    deletedAccount: false,
    signedupSuccess: false,
  });
  
  return (
    <div className="body-container">
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Routes />
      </AuthContext.Provider>
    </div>
    
  );
}

export default App;
