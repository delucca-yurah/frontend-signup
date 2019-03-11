import React, { Component } from 'react';
import Logotipo from './logotipo';
import NaoSou from '../modules/chat/components/NaoSou';

class Header extends Component {
  static getDerivedStateFromProps(props)  {
    return {
      loaded: props.loaded
    }
  }

  state = {
    loaded: this.props.loaded
  }

  render = () =>
    <header id='Header' >

      <section className={ `logo ${ (this.state.loaded || this.props.static) && 'moved' }` }>
        <Logotipo />
      </section>

      <NaoSou />
    
    </header>
}


export default Header;