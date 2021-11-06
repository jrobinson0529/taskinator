import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col
} from 'reactstrap';

export default function ServicesHero({
  cookingRobotsLength, murderRobotsLength, choresRobotsLength, lawnCareRobotsLength
}) {
  return (
    <div className="hero-image">
      <Container>
        <h2 className="services-title">Robot Services</h2>
        <Row>
          <Col>
            <h4><a href="#lawn-care">Lawn Care</a></h4>
            <p>{lawnCareRobotsLength} Available</p>
          </Col>
          <Col>
            <h4><a href="#chores">Chores</a></h4>
            <p>{choresRobotsLength} Available</p>
          </Col>
          <Col>
            <h4><a href="#cooking">Cooking</a></h4>
            <p>{cookingRobotsLength} Available</p>
          </Col>
          <Col>
            <h4><a href="#murdering">Murdering</a></h4>
            <p>{murderRobotsLength} Available</p>
          </Col>
        </Row>
      </Container>
  </div>
  );
}
ServicesHero.propTypes = {
  cookingRobotsLength: PropTypes.number,
  murderRobotsLength: PropTypes.number,
  choresRobotsLength: PropTypes.number,
  lawnCareRobotsLength: PropTypes.number
};
