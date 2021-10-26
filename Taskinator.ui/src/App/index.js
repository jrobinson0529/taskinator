import moment from 'moment';
import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';

function App() {
  // When you set up firebase add setUser method and change useState to null.
  const [user] = useState(false);
  const [time, setTime] = useState('');
  // Checking if MomentJS is working
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // Checking for authenticated users. You must set up firebase authentication for this to work!
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((authed) => {
  //     if (authed) {
  //       const userInfo = {
  //         fullName: authed.displayName,
  //         username: authed.email.split('@gmail.com')[0],
  //         uid: authed.uid
  //       };
  //       setUser(userInfo);
  //     } else if (user || user === null) {
  //       setUser(false);
  //     }
  //   });
  // }, []);
  return (
    <div className='App'>
     <Router>
        <NavBar user={user}/>
        <Routes time={time}/>
      </Router>
    </div>
  );
}

export default App;
