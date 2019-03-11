import { NAME } from './constants';

export const getHistory = state => state[NAME].history;

export const isFinished = state => (state[NAME].finished && !state[NAME].fetching && state[NAME].queue.length === 0);

export const isUserAllowed = state => state[NAME].allowUser;

export const isFetching = state => state[NAME].fetching;

export const getNextStep = state => state[NAME].nextStep;

export const getQueue = state => state[NAME].queue;