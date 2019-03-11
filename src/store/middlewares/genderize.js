import * as actions from '../../modules/inputs/actions';
import * as types from '../../modules/inputs/types';
import * as constants from '../../modules/chat/constants';

const _startedWithName = (name, gender, intent, fetching) =>
  (
    fetching === false &&
    intent === constants.getIntent[types.STARTED] &&
    name &&
    gender === null
  ) &&
  true

const _checkGender = store => {
  const { dispatch, getState } = store;
  const { nome } = getState().inputs;

  dispatch(actions.updateGenderStarted());
  const api = `https://api.genderize.io/?name=${ nome.trim().split(' ')[0] }&country_id=br`;
    fetch(api)
      .then(r => r.json())
      .then(result => dispatch(actions.updateGenderFinished(result.gender)))
      .catch(error => dispatch(actions.updateGenderFailed(error)))
}

const genderize = store => next => action => {
  next(action);

  const { nome, gender, intent, fetching } = store.getState().inputs;

  (action.type === types.NAME || _startedWithName(nome, gender, intent, fetching)) &&
    _checkGender(store)
}

export default genderize;
