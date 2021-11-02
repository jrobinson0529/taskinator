import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ProfileForm from '../components/forms/ProfileForm';
// import { useParams } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function Profile({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const handleClick = () => setEditing((prev) => !prev);
  // const { id } = useParams();
  return (
    <div className="d-flex justify-content-center flex-column">
      <img className="profile-image" src={user.imageUrl}/>
      <h2>{user.username}</h2>
      <hr/>
      { user.billingAddress !== '' ? <h3>{user.billingAddress}</h3> : <h3>You need to set a billing address to complete an order please edit profile and add one!</h3>}
      <Button onClick={() => handleClick()}>Click me</Button>
      { editing ? <ProfileForm user={user} setUser={setUser}/> : '' }
    </div>
  );
}
Profile.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
export default Profile;
