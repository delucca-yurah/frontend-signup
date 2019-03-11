import { NAME } from './constants';

export const getName = state => state[NAME].nome;

export const getSubject = state => state[NAME].tema;

export const getTrilhas = state => state[NAME].trilhas;

export const getAvatars = state => state[NAME].avatars;

export const getIntentToRetry = state => state[NAME].intent;