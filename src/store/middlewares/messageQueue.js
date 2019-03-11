import { flow } from 'lodash';
import actions from '../../modules/chat/actions';
import * as types from '../../modules/chat/types';

const _delayNextMessage = store => {
  if(!store) return false;

  const { dispatch, queue } = store;
  const currentMessage = queue[0];
  const idle = (currentMessage.reading + currentMessage.typing) * 1000;
  
  if(queue.length > 0) {
    dispatch(actions.toggleWaiting(types.WAITING_START));
    setTimeout(
      () => dispatch(actions.toggleWaiting(types.WAITING_STOP)),
      idle
    )
  }
}

const _sendMessage = store => {
  if(!store) return false;

  const { dispatch, queue } = store;

  dispatch(actions.showMessage(queue[0]));
  return store
}

const _shouldSend = store => {
  const { dispatch, getState } = store;
  const { waiting, queue } = getState().chat

  if(queue.length === 0) return false

  return (!waiting) &&
    ({
      queue,
      dispatch
    })
}

const _stillGotMessages = ({ chat, type }) =>
  (type === types.WAITING_STOP && chat.queue.length > 0)

const _gotNewQuestions = ({ type }) =>
  (type === types.GET_QUESTION_FINISHED)

const _executeUntilResolve = (...fns) =>
  args => fns.reduce(
    (p, f) =>
      (!p) ?
        f(args) :
        p, null
  )

const messageQueue = store => next => action => {
  next(action);
  
  const { chat } = store.getState();
  const { type } = action;

  (
    _executeUntilResolve(
      _gotNewQuestions,
      _stillGotMessages
    )({ chat, type })
  ) &&
     flow([_shouldSend, _sendMessage, _delayNextMessage])(store)
}

export default messageQueue;