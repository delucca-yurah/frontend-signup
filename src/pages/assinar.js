import React, { Component } from 'react';
import changeCase from 'change-case'
import { withRouter } from 'next/router';
import Chat from '../modules/chat/components/Chat';

class AssinarTrilha extends Component {
  static async getInitialProps({ res, ...ctx }) {
    if(!ctx.query.tema) {
      res.writeHead(302, { Location: '/' });
      res.end();
    }

    return {}
  }

  componentDidMount = () =>
    this.props.initTrackers('/assinar');

  render = () =>
    <Chat tema={ changeCase.titleCase(this.props.router.query.tema) } />
}

export default withRouter(AssinarTrilha);