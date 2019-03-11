import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { platformConfirm, platformRefuse } from '../../actions';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import { isProduction } from '../../../core/selectors';
import { logAction } from '../../../core/actions';

class InputConfirmContact extends Component {
  componentDidMount = () =>
    this.props.runTrackers('confirmar contato', this.props.isProduction)

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
  confirm: () => dispatch(platformConfirm()),
  refuse: () => dispatch(platformRefuse()),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputConfirmContact);