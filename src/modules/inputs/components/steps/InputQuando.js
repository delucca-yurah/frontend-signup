import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import weekdays from '@timeyurah/weekdays-string-builder';
import Stepper from './Stepper';
import SelectDays from '../SelectDays';
import SelectPeriod from '../SelectPeriod';
import { answerWhen } from '../../actions';
import { logAction } from '../../../core/actions';
import { isProduction } from '../../../core/selectors';

class InputQuando extends Component {
  state = {
    dias: [],
    periodo: 'agora',
    step: 0
  }

  componentDidMount = () => this.props.runTrackers('quando', this.props.isProduction);

  preprocess = (dias, periodo) => ({
    dias: weekdays(dias),
    periodo: (periodo !== 'agora') && `de ${ periodo }`
  })

  days = dias =>
    (dias[0] === 'hoje') ?
      this.props.answer(({ dias: 'hoje', periodo: ''})) :
      this.setState({ dias, step: 1 })

  submit = periodo =>
    this.props.answer(this.preprocess(this.state.dias, periodo)) 

  render = () =>
    <div id='InputQuando'>
      <Stepper step={ this.state.step }>
        <SelectDays key='step-1' submit={ this.days } />

        <SelectPeriod key='step-2' submit={ this.submit } />
      </Stepper>
    </div>
}

const selectors = createStructuredSelector({
  isProduction
})

const actions = dispatch => ({
  answer: (args) => dispatch(answerWhen(args)),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputQuando);