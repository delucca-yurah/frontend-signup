import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { createStructuredSelector } from 'reselect';
import Stepper from './Stepper';
import Platforms from '../Platforms';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import { answerPlatform } from '../../actions';
import { logAction } from '../../../core/actions';
import { isProduction } from '../../../core/selectors';

class InputOnde extends Component {
  state = {
    onde: null,
    step: 0,
  }

  componentDidMount = () => this.props.runTrackers('onde', this.props.isProduction);

  componentDidUpdate = () => this.focusOnInput();

  focusOnInput = () =>
    (
      this.state.onde !== '' &&
      this.state.step === 0 &&
      !isMobile
    ) && this.inputs[this.state.onde].input.focus();

  askForConfirmation = contato =>
    this.setState({
      contato,
      step: 1
    })

  select = onde => this.setState({ onde })

  submit = () =>
    this.props.answer(this.state.onde, this.state.contato)

  send = () =>
    this.inputs[this.state.onde].validate()

  render = () =>
    <div id='InputOnde'>
      <Stepper step={ this.state.step }>
        <Fragment key='step-1'>
          <Platforms
            ref={ (c) => this.inputs = c }
            type={ this.state.onde }
            value={ this.state.contato }
            submit={ this.askForConfirmation }
          />

          <ButtonGroup compressed={ this.state.onde } classes='buttons-onde-step-1'>
            <Button
              type='whatsapp'
              icon='fab fa-whatsapp'
              activeText='Enviar'
              action={ this.send }
              select={ this.select }
              selected={ this.state.onde === 'whatsapp' }
            />
            <Button
              type='email'
              icon='far fa-envelope'
              activeText='Enviar'
              action={ this.send }
              select={ this.select }
              selected={ this.state.onde === 'email' }
            />
          </ButtonGroup>
        </Fragment>

        <Fragment key='step-2'>
          <ButtonGroup classes='buttons-onde-step-2'>
            <Button
              type='voltar'
              icon='far fa-arrow-alt-circle-left'
              select={ () => this.setState({ step: 0 }) }
            />

            <div className='confirmacao'>
              <small>Confirme seu { this.state.onde }:</small>
              <h2>{ this.state.contato }</h2>
            </div>
            
            <Button
              ref={ (b) => this.confirmButton = b }
              type='continuar'
              icon='far fa-arrow-alt-circle-right'
              activeText='Confirmar'
              action={ this.submit }
              selected={ true }
            />
          </ButtonGroup>
        </Fragment>
      </Stepper>
    </div>
}

const selectors = createStructuredSelector({
  isProduction
})

const actions = dispatch => ({
  answer: (platform, contact) => dispatch(answerPlatform({ platform, contact })),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputOnde);