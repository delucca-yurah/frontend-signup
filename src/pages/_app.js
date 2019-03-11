import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import GoogleAnalytics, { timing } from 'react-ga';
import FacebookPixel from 'react-facebook-pixel';
import { PersistGate } from 'redux-persist/integration/react';
import AnimatedGate from '../components/AnimatedGate';
import { makeStore } from '../store/config';
import * as Sentry from '@sentry/browser';
import '../styles/main.scss';

class MyApp extends App {
  state = {
    error: null,
  };

  componentWillMount = () =>
    Sentry.init({ dsn: 'https://746e2fc4109943ff97a4422575adb0cc@sentry.io/1323050' });

  componentDidCatch = (error, errorInfo) => {
    this.setState({ error });
    const state = this.props.store.getState();

    Sentry.withScope(scope => {
      Object
        .keys(errorInfo)
        .forEach(key => scope.setExtra(key, errorInfo[key]) );

      scope.setExtra('environment', state.core.env || 'development');

      Sentry.captureException(error);
    });
  }

  initTrackers = (page) => {
    const state = this.props.store.getState();

    if(state.core.env === 'production') {
      GoogleAnalytics.initialize('UA-126012894-1');
      FacebookPixel.init('1769600976499234');

      GoogleAnalytics.pageview(page);
      FacebookPixel.pageView();
    }
  }

  render () {
    const { Component, pageProps, store } = this.props;

    return (this.state.error) ?
      <a onClick={() => Sentry.showReportDialog()}>
        Report feedback
      </a> :
      <Container>
        <Provider store={ store }>
          <PersistGate persistor={ store.__persistor }>
            {
              bootstraped =>
                <AnimatedGate query={ this.props.router.query } bootstraped={ bootstraped }>
                  <Component { ...pageProps } initTrackers={ this.initTrackers } />
                </AnimatedGate>
            }
          </PersistGate>
        </Provider>
      </Container>
  }
}

export default withRedux(makeStore)(MyApp)
