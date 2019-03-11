import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';
import initialState from './initialState';
import * as types from './types';
import * as errors from './errors';

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type){
    case types.RETRY:
      return Object.assign({}, state, {
        history: dropRight(state.history)
      })

    case types.NEW_CONVERSATION:
      return Object.assign({}, state, {
        finished: false,
        allowUser: false
      })

    case types.SIGNUP_STARTED:
      return Object.assign({}, state, {
        fetching: true,
        error: initialState.error
      })

    case types.SIGNUP_FAILED:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      })

    case types.SIGNUP_FINISHED:
      return Object.assign({}, state, {
        finished: true,
        error: null
      })

    case types.ADD_ANSWER:
      return Object.assign({}, state, {
        history: [...state.history, payload]
      })

    case types.TOGGLE_INPUT:
      return Object.assign({}, state, {
        allowUser: payload
      })

    case types.REFERRAL:
      return Object.assign({}, state, {
        referred: payload
      })

    case types.PRIME:
      return Object.assign({}, state, {
        prime: true
      })

    case types.WAITING_STOP:
      return Object.assign({}, state, {
        waiting: false
      })

    case types.WAITING_START:
      return Object.assign({}, state, {
        waiting: true
      })

    case types.SHOW_MESSAGE:
      return Object.assign({}, state, {
        history: [...state.history, payload],
        queue: drop(state.queue)
      })

    case types.GET_QUESTION_STARTED:
      return Object.assign({}, state, {
        fetching: true
      })

    case types.GET_QUESTION_FINISHED:
      return Object.assign({}, state, {
        queue: state.queue.concat(payload.messages),
        nextStep: payload.next,
        fetching: false
      })

    case types.GET_QUESTION_FAILED:
      return Object.assign({}, state, {
        history: [...state.history, errors.cantGetServer]
      })

    case types.RESET:
      return initialState

    default:
      return state;
  }
}
