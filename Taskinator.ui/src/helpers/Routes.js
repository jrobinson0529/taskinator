import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';
import Robot from '../views/Robot';
import Profile from '../views/Profile';
import Services from '../views/Services';
import SingleService from '../views/SingleService';
import UserCart from '../views/UserCart';
import CreateRobot from '../views/CreateRobot';

function Routes({ user, setUser }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/services" component={() => <Services />} />
        <Route exact path="/services/:categoryId" component={() => <SingleService />} />
        <Route exact path="/robot/:id" component={() => <Robot user={user} /> } />
        <PrivateRouteAdmin exact path="/create/robot" component={() => <CreateRobot/>} user={user}/>
        <PrivateRouteAdmin exact path="/edit/robot/:id" component={() => <EditRobot/>} user={user}/>
        <PrivateRoute exact path="/user/:id" component={() => <Profile user={user} setUser={setUser}/>} user={user}/>
        <PrivateRoute exact path="/cart/:id" component={() => <UserCart user={user}/>} user={user}/>
        <PrivateRoute exact path="/checkout/:id" component={() => <UserCheckout user={user}/>} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
export default Routes;

// function SingleService() {
//   const { id } = useParams();
//   return (
//      <div>
//        service number {id}
//      </div>
//   );
// }

function EditRobot() {
  const { id } = useParams();
  return (
     <div>
       Edit robot number {id}
     </div>
  );
}

// function UserCart() {
//   const { id } = useParams();
//   return (
//      <div>
//        cart number {id}
//      </div>
//   );
// }
function UserCheckout() {
  const { id } = useParams();
  return (
     <div>
       checkout number {id}
     </div>
  );
}
