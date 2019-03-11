import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Mensagem from './Mensagem';
import Conclusao from './Conclusao';
import Switcher from './Switcher';
import Box from './Box';
import { startChat } from '../actions';
import { isUserAllowed, getHistory, isFinished, getNextStep } from '../selectors';

class Chat extends Component {
  componentDidMount = () =>
    this.props.start({
      u: this.props.u,
      tema: this.props.tema,
      action: this.props.action
    })

  render = () =>
    <section id='Chat' className={ `page chat input-${ this.props.showInput } finished-${ this.props.finished } ${ this.props.step }` }>
      <div className='messages'>
        {
          this.props.history.map(message =>
            <Mensagem
              key={ message.id }
              type={ message.type }
              mensagem={ message.msg }
              user={ message.user }
              typing={ message.typing }
            />
          )
        }
      </div>

      <Box>
        <Switcher />
      </Box>

      <Conclusao />

    </section>
}

const selectors = createStructuredSelector({
  history: getHistory,
  showInput: isUserAllowed,
  finished: isFinished,
  step: getNextStep
})

const actions = dispatch => ({
  start: query => dispatch(startChat(query))
})

export default connect(selectors, actions)(Chat);