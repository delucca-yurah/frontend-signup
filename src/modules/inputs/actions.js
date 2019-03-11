import random from 'random';
import * as types from './types';

const _newAvatar = gender =>
  (gender) ?
  `/static/avatares/${ gender }/${ random.int(1,21) }.png` :
  '/static/avatares/avatar.png'

const _getTrilhasStarted = () => ({
  type: types.GET_TRILHAS_STARTED
})

const _getTrilhasFinished = trilhas => ({
  type: types.GET_TRILHAS_FINISHED,
  payload: trilhas
})

const _getTrilhasFailed = () => ({
  type: types.GET_TRILHAS_FAILED
})

export const startAgain = () => ({
  type: types.START_AGAIN
})

export const updateGenderStarted = () => ({
  type: types.UPDATE_GENDER_STARTED
})

export const updateGenderFailed = () => ({
  type: types.UPDATE_GENDER_FAILED
})

export const updateGenderFinished = gender => ({
  type: types.UPDATE_GENDER_FINISHED,
  payload: {
    gender,
    avatar: _newAvatar(gender)
  }
})

export const fetchTrilhas = () =>
  (dispatch, getState) => {
    dispatch(_getTrilhasStarted());
    const { trilhas } = getState().core;

    fetch(trilhas)
      .then(r => r.json())
      .then(r => dispatch(_getTrilhasFinished(r)))
      .catch(() => dispatch(_getTrilhasFailed()))
  }

export const platformConfirm = () => ({
  type: types.PLATFORM_CONFIRM
})

export const platformRefuse = () => ({
  type: types.PLATFORM_REFUSE
})

export const subjectConfirm = () => ({
  type: types.SUBJECT_CONFIRM
})

export const subjectRefuse = () => ({
  type: types.SUBJECT_REFUSE
})

export const resetInputs = () => ({
  type: types.RESET
})

export const answerName = name => ({
  type: types.NAME,
  payload: name
})

export const answerSubject = subject => ({
  type: types.SUBJECT,
  payload: subject
})

export const setSubject = subject => ({
  type: types.SET_SUBJECT_URL,
  payload: subject
})

export const answerPlatform = args => ({
  type: types.PLATFORM,
  payload: args
})

export const answerWhen = args => ({
  type: types.WHEN,
  payload: args
})

export default {
  answerWhen,
  answerPlatform,
  answerSubject,
  answerName,
  resetInputs,
  subjectConfirm,
  subjectRefuse,
  platformConfirm,
  platformRefuse,
  fetchTrilhas,
  updateGenderStarted,
  updateGenderFinished,
  updateGenderFailed,
  startAgain,
  setSubject
}