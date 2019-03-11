import pick from 'lodash/pick';
import flow from 'lodash/flow';
import libphonenumber from 'google-libphonenumber';
import * as actions from '../../modules/chat/actions';
import * as types from '../../modules/chat/types';
import * as constants from '../../modules/chat/constants';
import * as inputs from '../../modules/inputs/types';

const _failSignup = async (dispatch, response) => {
  const { error } = await response.json();
  dispatch(actions.signupFailed(error));
  dispatch(actions.getQuestion(constants.getIntent[inputs.FINISHED]));
}

const _finishSignup = dispatch => {
  setTimeout(() => dispatch(actions.signupFinished()), 1000); // Fix this in the future
  dispatch(actions.getQuestion(constants.getIntent[inputs.FINISHED]));
}

const _processNumber = contato => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const PNF = libphonenumber.PhoneNumberFormat;
  const number = phoneUtil.parseAndKeepRawInput(contato, 'BR');

  return phoneUtil.format(number, PNF.E164);
}

const _signup = store => {
  if(!store) return false;

  const { dispatch, chat, inputs, core } = store;
  const state = { ...chat, ...inputs };
  const fields = ['nome','tema','plataforma','contato','dias','periodo', 'prime', 'referred'];

  dispatch(actions.signupStarted())
  let user = pick(state, fields);

  (!user.referred) && delete user.referred;
  user.plataforma = user.plataforma.toLowerCase();

  user.contato =
    (user.plataforma === 'whatsapp') ?
    _processNumber(user.contato) :
    user.contato

  user.dias =
    user.dias
      .split(/[\s,]+/)
      .map(x => x.trim())
      .map(x => x.toLowerCase())
      .filter(x => x !== 'e')

  user.periodo = (user.periodo !== '') ?
    user.periodo.split(' ')[1] :
    'agora'

  const userInEnglish = {
    name: user.nome,
    platform: user.plataforma,
    address: user.contato,
    type: 'free',
    query: user.tema,
    days: user.dias,
    period: user.periodo,
    referred: user.referred,
  };

  fetch(core.students, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInEnglish)
  })
    .then(r => {
      (r.status === 200) ?
        _finishSignup(dispatch) :
        _failSignup(dispatch, r)
    })
    .catch(() => _failSignup(dispatch))
}

const _hasAllAnswers = store =>
  (
    store.inputs.nome &&
    store.inputs.tema &&
    store.inputs.plataforma &&
    store.inputs.contato &&
    store.inputs.dias
  ) &&
    store

const signup = store => next => action => {
  next(action);

  const { dispatch, getState } = store;
  const { chat, inputs, core } = getState();

  (action.type === types.ADD_ANSWER || action.type === types.RETRY) &&
  flow([_hasAllAnswers, _signup])({ dispatch, chat, inputs, core })
}

export default signup;
