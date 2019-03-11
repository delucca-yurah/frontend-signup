import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getNextStep } from '../selectors';
import Steps from '../../inputs/components/steps';

class Switcher extends Component {
  render = () => {
    if(!this.props.step) return <div />

    const Input = Steps[this.props.step];

    return <Input />
  }
};

const selectors = createStructuredSelector({
  step: getNextStep
});

export default connect(selectors)(Switcher);