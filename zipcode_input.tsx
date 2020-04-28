import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

interface IProps {}

interface IState {
  zipcode?: string;
}

export default class ZipcodeInput extends Component<IProps, IState> {
  inputField:any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      zipcode: ""
    };
  }
  
  handleChange(e) {
    let oTxt:string = e.target.value;
    oTxt = oTxt.replace('-', '');
    oTxt = oTxt.replace(/[^0-9]/, '');
    if (oTxt.length > 5) {
      oTxt = oTxt.substr(0, 5) + '-' + oTxt.substr(5);

      if (oTxt.length > 9) {
        oTxt = oTxt.substr(0, 9);
      }
    }
 
    this.setState({zipcode: oTxt});
  };

  render() {
    return (
      <Form.Control
        type="text"
        ref={(inputField) => (this.inputField = inputField)}
        value={this.state.zipcode}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
