import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Services from '../views/Services';
import SingleService from '../views/SingleService';
import UserCart from '../views/UserCart';
import Robot from '../views/Robot';
import AdminTools from '../views/AdminTools';
import UserCheckout from '../views/UserCheckout';
import DetailedOrderHistory from '../components/order-history-view/DetailedOrderHistory';

function Routes({ user, setUser }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/services" component={() => <Services />} />
        <Route exact path="/services/:categoryId" component={() => <SingleService />} />
        <Route exact path="/robot/:id" component={() => <Robot user={user} /> } />
        <PrivateRouteAdmin exact path="/admin-tools/" component={() => <AdminTools />} user={user}/>
        <PrivateRouteAdmin exact path="/edit/robot/:id" user={user}/>
        <PrivateRoute exact path="/user/:id" component={() => <Profile user={user} setUser={setUser}/>} user={user}/>
        <PrivateRoute exact path="/cart/:id" component={() => <UserCart user={user} setUser={setUser}/>} user={user}/>
        <PrivateRoute exact path="/checkout/:id" component={() => <UserCheckout user={user} />} user={user} />
        <PrivateRoute exact path="/orderHistory/:id" component={() => <DetailedOrderHistory user={user} />} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
export default Routes;
