import { getQuestion, addAnswer } from '../../modules/chat/actions'
import { getIntent } from '../../modules/chat/constants';
import * as types from '../../modules/inputs/types';

const _handleInput = (dispatch, type, context) => {
  dispatch(getQuestion(getIntent[type]));
  dispatch(addAnswer(type, context));
}

const _checkUserInput = type =>
  (
    type === types.NAME ||
    type === types.SUBJECT ||
    type === types.PLATFORM ||
    type === types.WHEN ||
    type === types.SUBJECT_CONFIRM ||
    type === types.SUBJECT_REFUSE ||
    type === types.PLATFORM_CONFIRM ||
    type === types.PLATFORM_REFUSE
  ) &&
    true

const answers = store => next => action => {
  next(action);

  const { dispatch, getState } = store;
  const { inputs } = getState();

  (_checkUserInput(action.type)) &&
  _handleInput(dispatch, action.type, inputs)
}

export default answers;