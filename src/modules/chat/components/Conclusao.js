import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import changeCase from 'change-case';
import SocialShare from '../../../components/SocialShare';
import { newChat } from '../actions';
import { isFinished } from '../selectors';
import { getSubject } from '../../inputs/selectors';
import { logSignup } from '../../core/actions';
import { isProduction } from '../../core/selectors';

class Conclusao extends Component {
  componentDidUpdate = () =>
    (this.props.finished) && this.props.runTrackers(this.props.isProduction);
  
  render = () =>
    <CSSTransition
      in={ this.props.finished }
      timeout={ 1800 }
      classNames='fade'
      unmountOnExit
    >
      <div className='conclusao'>
        <button type='button' className='btn btn-conclusao btn-apoia' onClick={ () => window.location = 'https://apoia.se/yurah' } >Quero ajudar</button>
        <button type='button' className='btn btn-conclusao' onClick={ this.props.restart } >Quero aprender mais</button>

        <SocialShare text='Compartilhe o que você está aprendendo' tema={ changeCase.paramCase(this.props.subject) } />
      </div>
    </CSSTransition>
}

const selectors = createStructuredSelector({
  finished: isFinished,
  subject: getSubject,
  isProduction
});

const actions = dispatch => ({
  restart: () => dispatch(newChat()),
  runTrackers: env => logSignup(env)
})

export default connect(selectors, actions)(Conclusao);