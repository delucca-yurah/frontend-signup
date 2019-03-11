import uuid from 'uuid/v4';
import format from 'string-format';
import * as types from '../inputs/types';

const USER = 'user'

const messages = {
  [types.NAME]: {
    id: uuid(),
    user: USER,
    msg: "Meu nome é <strong>{nome}</strong>",
    reading: 1,
    typing: 0
  },

  [types.SUBJECT]: {
    id: uuid(),
    user: USER,
    msg: "Eu quero aprender sobre <strong>{tema}</strong>",
    reading: 1,
    typing: 0
  },

  [types.SUBJECT_CONFIRM]: {
    id: uuid(),
    user: USER,
    msg: "Sim, eu quero aprender sobre <strong>{tema}</strong>",
    reading: 1,
    typing: 0
  },

  [types.SUBJECT_REFUSE]: {
    id: uuid(),
    user: USER,
    msg: "Não, <strong>eu quero aprender outra coisa</strong>",
    reading: 1,
    typing: 0
  },

  [types.PLATFORM]: {
    id: uuid(),
    user: USER,
    msg: "Por <strong>{plataforma}</strong> me enviando para <strong>{contato}</strong>",
    reading: 1,
    typing: 0
  },

  [types.WHEN]: {
    id: uuid(),
    user: USER,
    msg: "Gostaria de receber meus conteúdos <strong>{dias} {periodo}</strong>",
    reading: 1,
    typing: 0
  },

  [types.STARTED]: {
    id: uuid(),
    user: USER,
    msg: "Eu gostaria de aprender outra coisa, também",
    reading: 1,
    typing: 0
  },

  [types.PLATFORM_CONFIRM]: {
    id: uuid(),
    user: USER,
    msg: "Sim, por favor. <strong>Pode me enviar os conteúdos pelo mesmo local</strong>",
    reading: 1,
    typing: 0
  },

  [types.PLATFORM_REFUSE]: {
    id: uuid(),
    user: USER,
    msg: "Não, <strong>eu quero receber esses conteúdos em outro local</strong>",
    reading: 1,
    typing: 0
  }
}

export default (template, variables) => {
  const message = messages[template];
  const queue = { 
    ...message,
    msg: format(message.msg, variables)
  };

  return queue;
}