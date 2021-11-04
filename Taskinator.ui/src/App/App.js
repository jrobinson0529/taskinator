import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getSingleUserByGoogleId } from '../helpers/data/userData';
import { createCart, getCartItem } from '../helpers/data/orderData';

function App() {
  // When you set up firebase add setUser method and change useState to null.
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
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

  useEffect(() => {
    if (user) {
      getCartItem(user.id).then((response) => {
        if (response.length === 0) {
          const cartInfo = {
            userId: user?.id,
            paymentId: 'eeaa9dae-3229-4190-ad73-70b25023aa73',
            orderTotal: 0,
          };
          createCart(cartInfo).then((cartObj) => setCart(cartObj));
        } else {
          getCartItem(user.id).then((cartObj) => setCart(cartObj));
        }
      });
    }
  }, []);
  return (
    <div className='App'>
     <Router>
        <NavBar user={user} setUser={setUser} cart={cart}/>
        <Routes user={user} setUser={setUser} cart={cart}/>
     </Router>
    </div>
  );
}

export default App;
