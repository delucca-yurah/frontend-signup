import React, { Component } from 'react';
import libphonenumber from 'google-libphonenumber';
import PhoneInput from 'react-phone-number-input/basic-input';
import handleKeyPress from '@timeyurah/handle-key-press';
import 'react-phone-number-input/style.css';

class Phone extends Component {
  state = {
    phone: this.props.value || ''
  }

  phoneParse = () => {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const PNF = libphonenumber.PhoneNumberFormat;
    const number = phoneUtil.parseAndKeepRawInput(this.state.phone, 'BR');

    return { phoneUtil, number, PNF }
  }

  validate = () => {
    if(this.state.phone === '') return this.setState({ error: true });
    const { phoneUtil, number, PNF } = this.phoneParse();

    (phoneUtil.isValidNumber(number)) ?
      this.props.submit(phoneUtil.format(number, PNF.NATIONAL)) :
      this.setState({ error: true })
  }

  render = () =>
    <div className='inputs'>
      <PhoneInput
        country='BR'
        ref={ (input) => this.input = input }
        placeholder='DDD + Número'
        onKeyPress={ (e) => handleKeyPress(e, 'Enter', this.validate) }
        onChange={ phone => this.setState({ phone, error: false }) }
        value={ this.state.phone }
        className={ `input-text ${ (this.state.error) && 'invalid' }` }
      />

      {
        (this.state.error) &&
          <small className='input-error'>
            Digite um telefone válido
          </small>
      }
    </div>
}

export default Phone;