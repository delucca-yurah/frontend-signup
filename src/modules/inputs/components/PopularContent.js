import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import { fetchTrilhas } from '../actions';
import { getTrilhas } from '../selectors';

export class PopularContent extends Component {
  state = {
    open: false
  }

  componentDidMount = () =>
    this.props.fetch()

  hasTrilhas = () => (this.props.trilhas && this.props.trilhas.length > 0)

  render = () =>
    <CSSTransition
      in={ this.hasTrilhas() }
      timeout={ 800 }
      classNames="scaleup"
      unmountOnExit
    >
      <div id='PopularContent' className={ `popular-content outbox ${ (this.state.open) && 'opened' }` }>
        <button className='toggle' onClick={ () => this.setState({ open: !this.state.open }) } >
          <img src='/static/swipe.gif' className={ (this.state.open) ? 'swipe down' : 'swipe up' } />
        </button>

        <ul className='page'>
          {
            (this.props.trilhas) &&
            this.props.trilhas
              .filter(trilha =>
                (this.props.filter)
                  ? trilha.title.toLowerCase().includes(this.props.filter.toLowerCase())
                  : trilha
                )
              .map(trilha =>
                <li key={ trilha.id } onClick={ () => this.props.select(trilha.title) }>{ trilha.title }</li>
              )
          }
        </ul>
      </div>
    </CSSTransition>
}

const selectors = createStructuredSelector({
  trilhas: getTrilhas
})

const actions = dispatch => ({
  fetch: () => dispatch(fetchTrilhas())
})

export default connect(selectors, actions)(PopularContent);