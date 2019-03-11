import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import { reset } from '../../core/actions';
import { getName } from '../../inputs/selectors';

class NaoSou extends Component {
  state = {
    isRecurrent: true
  }

  shouldShow = () =>
    (this.state.isRecurrent && this.props.name !== null) &&
    true

  logout = () => {
    this.setState({ isRecurrent: false });
    setTimeout(this.props.logout, 850);
  }

  render = () =>
    <CSSTransition
      in={ this.shouldShow() }
      timeout={ 800 }
      classNames='fade'
      unmountOnExit
    >
      {
        state => (
          <div className='naosoucontainer'>
            <button type='button' className='naosou' onClick={ this.logout } >Não sou <strong>{ this.props.name.split(' ')[0] }</strong></button>
          </div>
        )
      }
    </CSSTransition>
}

const selectors = createStructuredSelector({
  name: getName
});

const actions = dispatch => ({
  logout: () => dispatch(reset())
});

export default connect(selectors, actions)(NaoSou);