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
            <h4>Lawn Care</h4>
            <p>{lawnCareRobotsLength} Available</p>
          </Col>
          <Col>
            <h4>Chores</h4>
            <p>{choresRobotsLength} Available</p>
          </Col>
          <Col>
            <h4>Cooking</h4>
            <p>{cookingRobotsLength} Available</p>
          </Col>
          <Col>
            <h4>Murder</h4>
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
