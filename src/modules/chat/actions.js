import moment from 'moment-timezone';
import pick from 'lodash/pick';
import messages from './messages';
import * as constants from './constants';
import * as types from './types';
import * as input from '../inputs/actions';
import * as inputTypes from '../inputs/types';

const _isFinished = ({ inputs }) =>
    inputs.nome &&
    inputs.tema &&
    inputs.plataforma &&
    inputs.contato &&
    inputs.dias
    && true

const _timeout = (ms, promise) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(resolve, reject);
  })

const _newConversation = () => ({
  type: types.NEW_CONVERSATION
})

const _getContext = state => pick({
  ...state.chat,
  ...state.inputs
}, constants.CONTEXT_ITEMS)

const _setReferral = referral => ({
  type: types.REFERRAL,
  payload: referral
})

const _setPrime = () => ({
  type: types.PRIME
})

const _getQuestionStarted = () => ({
  type: types.GET_QUESTION_STARTED
})

const _getQuestionFinished = question => ({
  type: types.GET_QUESTION_FINISHED,
  payload: question
})

const _getQuestionFailed = () => ({
  type: types.GET_QUESTION_FAILED
})

const _retry = () => ({
  type: types.RETRY
})

export const fetchAgain = () =>
  (dispatch, getState) => {
    dispatch(_retry())

    const { intent } = getState().inputs;

    (intent !== constants.getIntent[inputTypes.WHEN]) &&
    dispatch(getQuestion(intent))
  }


export const signupStarted = () => ({
  type: types.SIGNUP_STARTED
})

export const signupFinished = () => ({
  type: types.SIGNUP_FINISHED
})

export const signupFailed = error => ({
  type: types.SIGNUP_FAILED,
  payload: error
})

export const addAnswer = (template, context) => ({
  type: types.ADD_ANSWER,
  payload: messages(template, context)
})

export const resetChat = () => ({
  type: types.RESET
})

export const toggleInput = toggle => ({
  type: types.TOGGLE_INPUT,
  payload: toggle
})

export const toggleWaiting = wait => ({
  type: wait
})

export const showMessage = message => ({
  type: types.SHOW_MESSAGE,
  payload: message
})

export const newChat = () =>
  dispatch => {
    dispatch(input.startAgain())
    dispatch(_newConversation())
    dispatch(getQuestion(constants.getIntent[inputTypes.STARTED]))
  }

export const startChat = query =>
  (dispatch, getState) => {
    const { prime, referral } = getState().chat;

    (query.tema) && dispatch(input.setSubject(query.tema));
    (query.action === 'prime' && !prime) && dispatch(_setPrime());
    (query.u && !referral) && dispatch(_setReferral(query.u));

    dispatch(getQuestion(constants.getIntent[inputTypes.STARTED]))
  }

export const getQuestion = intent =>
  (dispatch, getState) => {
    dispatch(_getQuestionStarted())

    const state = getState()
    const { core } = state
    const body = {
      intent,
      context: _getContext(state),
      asked: moment().tz('America/Sao_Paulo')
    }

    if(_isFinished(state) && state.chat.nextStep) body.intent = constants.getIntent[inputTypes.WHEN]

    _timeout(
      5000,
      fetch(core.chat, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(r => r.json())
        .then(r => dispatch(_getQuestionFinished(r)))
    ).catch(error => dispatch(_getQuestionFailed(error)))
  }

export default {
  getQuestion,
  startChat,
  showMessage,
  toggleWaiting,
  toggleInput,
  resetChat,
  addAnswer,
  signupFailed,
  signupFinished,
  signupStarted,
  newChat,
  fetchAgain
}
