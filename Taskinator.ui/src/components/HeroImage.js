import React from 'react';
import {
  Container, Row, Col
} from 'reactstrap';

export default function HeroImage() {
  return (
    <div className="hero-image">
    <Container>
      <Row>
        <Col>
          <div className="hero-text">
            <h2>The Taskinator</h2>
          </div>
        </Col>
        <Col>
        <img src="https://user-images.githubusercontent.com/76854545/139349776-b53fec6e-85bb-4fad-bf61-b00bfcdb2810.png" width="250px" />
        </Col>
      </Row>
    </Container>
  </div>
  );
}
