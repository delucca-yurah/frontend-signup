import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Chat from '../modules/chat/components/Chat';

class AssinarTrilha extends Component {
  componentDidMount = () =>
    this.props.initTrackers('/prime');

  render = () =>
    <Chat action='prime' />
}

export default withRouter(AssinarTrilha);