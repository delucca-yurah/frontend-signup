import React, { Component } from 'react';
import Chat from '../modules/chat/components/Chat';

class Home extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  componentDidMount = () =>
    this.props.initTrackers('/');

  render = () =>
    <Chat u={ this.props.query.u } />
}

export default Home;