import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import {
  Card, CardBody, CardImg, CardTitle, Button
} from 'reactstrap';
import { getSingleUserByGoogleId } from '../helpers/data/userData';

function RobotCard({ ...robot }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (firebase.auth().currentUser) {
      const currentUserGoogleId = firebase.auth().currentUser.uid;
      getSingleUserByGoogleId(currentUserGoogleId).then(setUser);
    }
  }, []);
  const history = useHistory();
  const handleClick = () => {
    history.push(`/robot/${robot.id}`);
  };

  return (
    <Card className='robot-card'>
    {
      user ? <Button className="card-button" onClick={() => handleClick()}><CardImg
      alt="Card image cap"
      src={robot.imageUrl}
      top
      width="100%"
    /></Button> : <CardImg
    alt="Card image cap"
    src={robot.imageUrl}
    top
    width="100%"
  />
    }
    <CardBody>
      <CardTitle tag="h5">
        {robot.title}
      </CardTitle>
    </CardBody>
  </Card>
  );
}

export default RobotCard;
