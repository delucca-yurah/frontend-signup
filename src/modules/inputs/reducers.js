import changeCase from 'change-case';
import initialState from './initialState';
import * as types from './types';
import * as chatConstants from '../chat/constants';

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type){
    case types.START_AGAIN:
      return Object.assign({}, state, {
        tema: initialState.tema,
        dias: initialState.dias,
        periodo: initialState.periodo,
        intent: chatConstants.getIntent[types.STARTED]
      })

    case types.UPDATE_GENDER_STARTED:
      return Object.assign({}, state, {
        fetching: true,
      })

    case types.UPDATE_GENDER_FINISHED:
      return Object.assign({}, state, {
        gender: payload.gender,
        fetching: false,
        avatars: {
          ...state.avatars,
          user: payload.avatar
        }
      })

    case types.UPDATE_GENDER_FAILED:
      return Object.assign({}, state, {
        gender: 'unknow',
        fetching: false,
      })

    case types.GET_TRILHAS_FINISHED:
      return Object.assign({}, state, {
        trilhas: payload
      })

    case types.PLATFORM_CONFIRM:
      return Object.assign({}, state, {
        refused: false,
        intent: chatConstants.getIntent[types.PLATFORM_CONFIRM]
      })

    case types.PLATFORM_REFUSE:
      return Object.assign({}, state, {
        refused: true,
        intent: chatConstants.getIntent[types.PLATFORM_REFUSE]
      })

    case types.SUBJECT_CONFIRM:
      return Object.assign({}, state, {
        refused: false,
        intent: chatConstants.getIntent[types.SUBJECT_CONFIRM]
      })

    case types.SUBJECT_REFUSE:
      return Object.assign({}, state, {
        refused: true,
        intent: chatConstants.getIntent[types.SUBJECT_REFUSE]
      })

    case types.NAME:
      return Object.assign({}, state, {
        nome: payload,
        intent: chatConstants.getIntent[types.NAME]
      })

    case types.SUBJECT:
      return Object.assign({}, state, {
        tema: payload,
        intent: chatConstants.getIntent[types.SUBJECT]
      })

    case types.SET_SUBJECT_URL:
      return Object.assign({}, state, {
        tema: payload,
        intent: chatConstants.getIntent[type.SET_SUBJECT_URL]
      })

    case types.PLATFORM:
      return Object.assign({}, state, {
        plataforma: changeCase.titleCase(payload.platform),
        contato: payload.contact,
        intent: chatConstants.getIntent[types.PLATFORM]
      })

    case types.WHEN:
      return Object.assign({}, state, {
        dias: payload.dias,
        periodo: payload.periodo,
        intent: chatConstants.getIntent[types.WHEN]
      })

    case types.RESET:
      return initialState

    default:
      return state;
  }
}
