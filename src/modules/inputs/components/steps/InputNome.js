import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import changeCase from 'change-case';
import handleKeyPress from '@timeyurah/handle-key-press';
import { createStructuredSelector } from 'reselect';
import { answerName } from '../../actions';
import { logAction } from '../../../core/actions';
import { isProduction } from '../../../core/selectors';

class InputNome extends Component {
  state = {
    nome: ''
  }

  componentDidMount = () => {
    (!isMobile) &&
    this.input.focus();

    this.props.runTrackers('nome', this.props.isProduction)
  }

  submit = () => 
    (this.state.nome) &&
    this.props.answer(changeCase.upperCaseFirst(this.state.nome).trim())

  render = () =>
    <div id='InputNome'>
      <input
        type='text'
        ref={ (input) => this.input = input }
        className='input-text'
        placeholder='Digite seu nome'
        onKeyPress={ (e) => handleKeyPress(e, 'Enter', this.submit) }
        onChange={ (e) => this.setState({ nome: e.target.value }) }
        value={ this.state.nome } />
        
      <span className='buttons'>
        <button type='button' className='btn btn-submit' onClick={ this.submit } >Enviar</button>
      </span> 
    </div>
}

const selectors = createStructuredSelector({
  isProduction
})

const actions = dispatch => ({
  answer: name => dispatch(answerName(name)),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputNome);