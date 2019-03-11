import React, { Component } from 'react';
import Phone from './Phone';
import Email from './Email';

class Platforms extends Component {
  handleInput = () => {
    switch(this.props.type) {
      case 'email':
        return(
          <Email
            ref={ (c) => this.email = c }
            submit={ this.props.submit }
            value={ this.props.value }
          />
        )

      case 'whatsapp':
      default:
        return (
          <Phone
            ref={ (c) => this.whatsapp = c }
            submit={ this.props.submit }
            value={ this.props.value }
          />
        )
    }
  }

  render = () =>
    <div className={ `inputs-onde ${ (this.props.type) && 'show' }` }>
      {
        this.handleInput()
      }
    </div>
}

export default Platforms;