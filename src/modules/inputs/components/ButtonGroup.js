import React, { Component } from 'react';

class ButtonGroup extends Component {
  render = () =>
    <span className={ `${ this.props.classes } buttons-onde ${ (this.props.compressed) && 'compressed' }` }>
      { this.props.children }
    </span>
}

export default ButtonGroup;