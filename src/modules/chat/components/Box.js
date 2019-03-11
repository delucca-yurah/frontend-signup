import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import { isUserAllowed, getNextStep } from '../selectors';

class Box extends Component {
  showInput = () =>
    (this.props.allowed && this.props.next) &&
    true

  render = () =>
    <CSSTransition
      in={ this.showInput() }
      timeout={ 800 }
      classNames="move"
      unmountOnExit
    >
      {
        () => (
            <section className='input-box'>
              <div className='page'>

                { this.props.children }
                  
              </div>
            </section>
        )
      }
    </CSSTransition>
}

const selectors = createStructuredSelector({
  next: getNextStep,
  allowed: isUserAllowed
})

export default connect(selectors)(Box);