import * as types from './types';
import * as actionTypes from '../chat/constants';

const inputs = {
  nome: null,
  gender: null,
  tema: null,
  plataforma: null,
  contato: null,
  dias: null,
  periodo: null,
  trilhas: null,
  refused: false,
  fetching: false,
  intent: actionTypes.getIntent[types.STARTED],
  avatars: {
    yurah: '/static/avatar-yurah.jpg',
    user: '/static/avatares/avatar.png'
  }
}

export default inputs;
