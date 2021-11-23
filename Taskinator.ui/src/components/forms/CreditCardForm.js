import React from 'react';
import Cards from 'react-credit-cards';
import {
  Col, Container, Input, Row
} from 'reactstrap';

export default class CreditCardForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="PaymentForm">
        <Container>
          <Row>
            <Col>
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
            </Col>
            <Col>
              <Input
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="Card Holder Name"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  type="text"
                  name="expiry"
                  placeholder="MM / YY"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <Input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
