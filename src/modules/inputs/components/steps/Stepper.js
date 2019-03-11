import { Component } from 'react';

class Stepper extends Component {
  render = () =>
    this.props.children[this.props.step]
}

export default Stepper;