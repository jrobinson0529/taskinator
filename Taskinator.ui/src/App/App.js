import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getSingleUserByGoogleId } from '../helpers/data/userData';

function App() {
  // When you set up firebase add setUser method and change useState to null.
  const [user, setUser] = useState(null);
  // Checking for authenticated users. You must set up firebase authentication for this to work!
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        // eslint-disable-next-line no-undef
        authed.getIdToken().then((token) => localStorage.setItem('token', token));
        getSingleUserByGoogleId(authed.uid).then((response) => setUser(response));
      } else {
        setUser(false);
      }
    });
  }, []);
  return (
    <div className='App'>
      <Router>
        <NavBar user={user} setUser={setUser}/>
        <Routes user={user} setUser={setUser}/>
      </Router>
    </div>
  );
}

export default App;
