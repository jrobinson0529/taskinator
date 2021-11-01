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
        <img src="https://user-images.githubusercontent.com/76854545/139540763-66a9298d-0bf5-4938-9a14-1ebbc933f28c.png" width="250px" />
        </Col>
      </Row>
    </Container>
  </div>
  );
}
