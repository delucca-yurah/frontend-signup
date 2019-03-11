import React, { Component } from 'react';
import validator from 'validator';
import changeCase from 'change-case';
import handleKeyPress from '@timeyurah/handle-key-press';

class Email extends Component {
  state = {
    email: this.props.value || ''
  }

  validate = () =>
    (validator.isEmail(this.state.email)) ?
      this.props.submit(changeCase.lowerCase(this.state.email)) :
      this.setState({ error: true })

  render = () =>
    <div className='inputs'>
      <input
        type='text'
        ref={ input => this.input = input }
        placeholder='Digite seu e-mail'
        onKeyPress={ e => handleKeyPress(e, 'Enter', this.validate) }
        onChange={ e => this.setState({ email: e.target.value, error: false }) }
        value={ this.state.email }
        className={ `input-text ${ (this.state.error) && 'invalid' }` }
      />

      {
        (this.state.error) &&
          <small className='input-error'>
            Digite um e-mail válido
          </small>
      }
    </div>
}

export default Email;