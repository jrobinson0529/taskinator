import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';

function Routes({ user }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/services" component={() => <Services />} />
        <Route exact path="/services/:id" component={() => <SingleService />} />
        <Route exact path="/robot/:id" component={() => <Robot />} />
        <PrivateRouteAdmin exact path="/create/robot" component={() => <CreateRobot/>} user={user}/>
        <PrivateRouteAdmin exact path="/edit/robot/:id" component={() => <EditRobot/>} user={user}/>
        <PrivateRoute exact path="/user/:id" component={() => <UserProfile user={user}/>} user={user}/>
        <PrivateRoute exact path="/cart/:id" component={() => <UserCart user={user}/>} user={user}/>
        <PrivateRoute exact path="/checkout/:id" component={() => <UserCheckout user={user}/>} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
};
export default Routes;

function Services() {
  return (
     <div>
       Services
     </div>
  );
}
function Robot() {
  const { id } = useParams();
  return (
     <div>
       robot number {id}
     </div>
  );
}

function SingleService() {
  const { id } = useParams();
  return (
     <div>
       service number {id}
     </div>
  );
}

function CreateRobot() {
  return (
     <div>
       Create Robot
     </div>
  );
}
function EditRobot() {
  const { id } = useParams();
  return (
     <div>
       Edit robot number {id}
     </div>
  );
}

function UserProfile({ user }) {
  const { id } = useParams();
  console.warn(user);
  return (
     <div>
       user number {id}
     </div>
  );
}
function UserCart() {
  const { id } = useParams();
  return (
     <div>
       cart number {id}
     </div>
  );
}
function UserCheckout() {
  const { id } = useParams();
  return (
     <div>
       checkout number {id}
     </div>
  );
}
UserProfile.propTypes = {
  user: PropTypes.any,
};
