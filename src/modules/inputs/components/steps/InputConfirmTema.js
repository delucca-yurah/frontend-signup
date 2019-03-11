import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { subjectConfirm, subjectRefuse } from '../../actions';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import { isProduction } from '../../../core/selectors';
import { logAction } from '../../../core/actions';

class InputConfirmContact extends Component {
  componentDidMount = () =>
    this.props.runTrackers('confirmar tema', this.props.isProduction);

  render = () =>
    <div id="InputConfirmContact">
      <ButtonGroup classes={ ['buttons-onde'] }>
        <Button
          type='back'
          selected={ true }
          action={ this.props.refuse }
          activeText='Não'
        />
        <Button
          type='confirm'
          selected={ true }
          action={ this.props.confirm }
          activeText='Sim'
        />
      </ButtonGroup>
    </div>
}

const selectors = createStructuredSelector({
  isProduction
})

const actions = dispatch =>  ({
  confirm: () => dispatch(subjectConfirm()),
  refuse: () => dispatch(subjectRefuse()),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputConfirmContact);