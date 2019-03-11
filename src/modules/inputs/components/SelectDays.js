import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { xor } from 'lodash';
import { DIAS } from '../constants';
import { getTrilhas, getSubject } from '../selectors';

export class SelectDays extends Component {
  state = {
    dias: []
  }

  dias = () =>
    DIAS.map(dia =>
      <span
        key={ dia.full }
        onClick={ () => this.setState({ dias: xor(this.state.dias, [dia.full]) }) }
        className={ `dia
          ${ (this.state.dias.includes(dia.full)) && 'selected' }
          ${ (this.state.dias[0] === 'hoje') && 'disabled' }`}
      >

        <span className='full'>{ dia.short }</span>
        <span className='dia-compressed'>{ dia.short[0] }</span>

      </span>
    )

  select = () =>
    this.setState({ dias: (this.state.dias[0] === 'hoje') ? [] : ['hoje'] })

  submit = () =>
      this.props.submit(this.state.dias)

  render = () =>
    <div id="SelectDias">
      <div className='box-dias'>
        {
          this.dias()
        }

        {
          (
            this.props.trilhas &&
            this.props.trilhas.find(trilha => trilha.title === this.props.subject)
          ) &&
            <label className='tudo-hoje'>
              <span className='label-compressed'>Hoje</span>
              <span className='full'>Receber tudo hoje</span>

              <input
                id='tudohoje'
                type='checkbox'
                onClick={ this.select } />
              <span className='checkmark' />
            </label>
        }
      </div>

      <span className='buttons'>
        <button id="submitdays" type='button' className='btn btn-submit' onClick={ this.submit } >
          <span className='full'>Enviar</span>
          <span className='btn-compressed'><i className="far fa-arrow-alt-circle-right" /></span>
        </button>
      </span>
    </div>
}

const selectors = createStructuredSelector({
  subject: getSubject,
  trilhas: getTrilhas
})

export default connect(selectors)(SelectDays);
