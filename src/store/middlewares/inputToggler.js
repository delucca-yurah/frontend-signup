import * as actions from '../../modules/chat/actions';
import * as chatTypes from '../../modules/chat/types';
import * as inputTypes from '../../modules/inputs/types';

const _shouldShowInput = store => {
  const { dispatch, getState } = store;
  const { allowUser, queue, history, waiting } = getState().chat;

  (!waiting && !allowUser && queue.length === 0 && history.length !== 0) &&
  dispatch(actions.toggleInput(true));
}

const _checkUserInput = type =>
  (
    type === inputTypes.NAME ||
    type === inputTypes.SUBJECT ||
    type === inputTypes.PLATFORM ||
    type === inputTypes.WHEN ||
    type === inputTypes.SUBJECT_CONFIRM ||
    type === inputTypes.SUBJECT_REFUSE ||
    type === inputTypes.PLATFORM_CONFIRM ||
    type === inputTypes.PLATFORM_REFUSE
  ) &&
    true

const inputToggler = store => next => action => {
  next(action);

  const { dispatch } = store;

  (_checkUserInput(action.type)) &&
  dispatch(actions.toggleInput(false));

  (action.type === chatTypes.WAITING_STOP) &&
  _shouldShowInput(store);
}

export default inputToggler;