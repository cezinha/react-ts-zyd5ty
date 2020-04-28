import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { Container, Row, Form } from 'react-bootstrap';
import ZipcodeInput from './zipcode_input';
import MyMap from './map';

interface AppProps { }
interface AppState { }
class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <ZipcodeInput />
          </Row>
        </Container>
        <Container>
          <Row>
            <MyMap />
          </Row>
        </Container>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
