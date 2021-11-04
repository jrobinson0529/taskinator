import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { createUser, getSingleUserByGoogleId } from '../helpers/data/userData';
import { createCart } from '../helpers/data/orderData';

function App() {
  // When you set up firebase add setUser method and change useState to null.
  const [user, setUser] = useState(null);
  // Checking for authenticated users. You must set up firebase authentication for this to work!z
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const firstName = authed.displayName.split(' ')[0];
        const lastName = authed.displayName.split(' ')[1];
        const userInfo = {
          imageUrl: authed.photoURL,
          firstName,
          lastName,
          username: authed.email.split('@gmail.com')[0],
          email: authed.email,
          billingAddress: ' ',
          isAdmin: false,
          googleId: authed.uid,
        };
        // Checking for duplicate users
        getSingleUserByGoogleId(authed.uid).then((response) => {
          if (!response) {
            createUser(userInfo).then(setUser);
          } else {
            setUser(response);
          }
        });
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);
  const cartInfo = {
    userId: user?.id,
    paymentId: 'cf245dfd-20e2-4745-90a0-e7a6fa1e1655',
    orderTotal: 0,
  };
  createCart(cartInfo).then((res) => console.warn(res));
  return (
    <div className='App'>
     <Router>
        <NavBar user={user}/>
        <Routes user={user} setUser={setUser}/>
     </Router>
    </div>
  );
}

export default App;
