import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAgain } from '../actions';
import { getAvatars } from '../../inputs/selectors';

class Mensagem extends Component {
  state = {
    height: 0,
    texto: '<img src="/static/typing.gif" alt="Digitando..." class="typing" />'
  }

  componentWillMount = () =>
    setTimeout(this.loadMessage, this.props.typing * 1000);

  componentDidMount = () => 
    window.addEventListener('resize', this.updateDimensions);

  componentDidUpdate = () =>
    (this.state.height === 0) &&
      this.setState({ height: this.msg.clientHeight });

  componentWillUnmount = () =>
    window.removeEventListener('resize', this.updateDimensions);

  updateDimensions = () => this.setState({ height: this.msg.clientHeight });

  loadMessage = () =>
    this.setState({ texto: this.props.mensagem })

  retry = () =>
    (this.props.type === 'error') &&
    this.props.retry()

  render = () =>
    <div
      className={ `mensagem from-${ this.props.user } ${ this.props.type }` }
      style={ { height: this.state.height } }
      onClick={ this.retry }
    >
      <span className='speech-bubble' />
      <figure className='avatar'>
        <img src={ this.props.avatars[this.props.user] } alt='Avatar' />
      </figure>

      <p className='texto' dangerouslySetInnerHTML={ { __html: this.state.texto } }  ref={ (msg) => this.msg = msg } />
   </div>
}

const selectors = createStructuredSelector({
  avatars: getAvatars
});

const actions = dispatch => ({
  retry: () => dispatch(fetchAgain())
})

export default connect(selectors, actions)(Mensagem);