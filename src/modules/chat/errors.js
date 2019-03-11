import uuid from 'uuid/v4'
import * as constants from './constants';

export const cantGetServer = {
  id: uuid(),
  type: constants.ERROR,
  user: constants.YURAH,
  msg: "Parece que você, ou nosso servidor, está offline. <span>Clique aqui para recarregar</span>",
  reading: 0,
  typing: 0
}