import React from 'react';
import {
  Container, Row, Col
} from 'reactstrap';

export default function ServicesHero() {
  return (
    <div className="hero-image">
      <Container>
        <h2 className="services-title">Robot Services</h2>
        <Row>
          <Col>
            <h4>Lawn Care</h4>
            <p>15 Available</p>
          </Col>
          <Col>
            <h4>Cleaning</h4>
            <p>25 Available</p>
          </Col>
          <Col>
            <h4>Cooking</h4>
            <p>10 Available</p>
          </Col>
          <Col>
            <h4>Casual Murder</h4>
            <p>200 Available</p>
          </Col>
        </Row>
      </Container>
  </div>
  );
}
