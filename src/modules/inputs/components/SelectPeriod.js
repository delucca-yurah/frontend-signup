import React, { Component } from 'react';

class SelectPeriod extends Component {
  state = {
    periodo: null
  }

  submit = () =>
    this.state.periodo
    && this.props.submit(this.state.periodo)

  render = () =>
    <div id='SelectPeriod'>
      <div className='box-dias periodo'>
          <button
            type='button'
            className={ `btn btn-submit ${ (this.state.periodo === 'manhã') && 'selected' }` }
            onClick={ () => this.setState({ periodo: 'manhã' }) }
          >
              Manhã
          </button>

          <button
            type='button'
            className={ `btn btn-submit ${ (this.state.periodo === 'tarde') && 'selected' }` }
            onClick={ () => this.setState({ periodo: 'tarde' }) }
          >
            Tarde
          </button>

          <button
            type='button'
            className={ `btn btn-submit ${ (this.state.periodo === 'noite') && 'selected' }` }
            onClick={ () => this.setState({ periodo: 'noite' }) }
          >
            Noite
          </button>
        </div>

        <span className='buttons selecionando-periodos'>
          <button type='button' className='btn btn-submit' onClick={ this.submit } >
            <span className='full'>Enviar</span>
            <span className='btn-compressed'><i className="far fa-arrow-alt-circle-right" /></span>
          </button>
        </span>
    </div>
}

export default SelectPeriod;
