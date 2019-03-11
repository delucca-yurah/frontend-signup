import GoogleAnalytics from 'react-ga';
import FacebookPixel from 'react-facebook-pixel';
import { resetChat, newChat } from '../chat/actions';
import { resetInputs } from '../inputs/actions';

const _runTrackers = (gaConfig, fbType, fbConfig = null) => {
  GoogleAnalytics.event(gaConfig);
  FacebookPixel.track(fbType, fbConfig);
}

export const reset = () =>
  dispatch => {
    dispatch(resetChat())
    dispatch(resetInputs())
    dispatch(newChat())
  }

export const logAction = (action, isProduction) => {
  (isProduction) &&
  _runTrackers(
    {
      category: 'User',
      action: `Chegou na inserção de ${ action }`
    },
    'ViewContent',
    {
      value: 0,
      currency: 'BRL',
      content_ids: action
    });
};

export const logSignup = (isProduction) => {
  (isProduction) &&
  _runTrackers(
    {
      category: 'User',
      action: 'Se cadastrou'
    },
    'CompleteRegistration');
}