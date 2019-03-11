import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import changeCase from 'change-case';
import { createStructuredSelector } from 'reselect';
import handleKeyPress from '@timeyurah/handle-key-press';
import { answerSubject } from '../../actions';
import { logAction } from '../../../core/actions';
import { isProduction } from '../../../core/selectors';
import PopularContent from '../PopularContent';

class InputTema extends Component {
  state = {
    tema: ''
  }

  componentDidMount = () => {
    (!isMobile) &&
    this.input.focus();

    this.props.runTrackers('tema', this.props.isProduction);
  }

  submit = (tema) => {
    tema = (!tema) ? this.state.tema : tema;

    (tema) &&
    this.props.answer(changeCase.upperCaseFirst(tema).trim())
  }

  render = () =>
    <div id='InputTema'>
      <PopularContent select={ this.submit } filter={ this.state.tema } />

      <input
        type='text'
        ref={ (input) => this.input = input }
        className='input-text' placeholder='Digite o tema'
        onKeyPress={ (e) => handleKeyPress(e, 'Enter', this.submit) }
        onChange={ (e) => this.setState({ tema: e.target.value }) }
        value={ this.state.tema } />
        
      <span className='buttons'>
        <button type='button' className='btn btn-submit' onClick={ () => this.submit() } >Enviar</button>
      </span> 
    </div>
}

const selectors = createStructuredSelector({
  isProduction
})

const actions = dispatch => ({
  answer: subject => dispatch(answerSubject(subject)),
  runTrackers: (action, env) => logAction(action, env)
})

export default connect(selectors, actions)(InputTema);