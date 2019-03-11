import React, { Component } from 'react';

class Button extends Component {
  action = () =>
    (this.props.selected) ?
      this.props.action() :
      this.props.select(this.props.type)

  render = () =>
    <button
      ref={ (b) => this.button = b }
      type='button'
      className={ `btn btn-${ this.props.type } btn-canais ${ (this.props.selected) && 'selected' }` }
      onClick={ this.action }
    >
      <i className="far fa-arrow-alt-circle-right send-no-text" />
      <i className={ this.props.icon } />

      <span>
        {
          (this.props.selected) ?
            this.props.activeText :
            this.props.type
        }
      </span>
    </button>
}

export default Button;