import * as inputs from '../inputs/types';

export const NAME = 'chat';

export const YURAH = 'yurah';

export const ERROR = 'error';

export const CONTEXT_ITEMS = [
  'nome',
  'tema',
  'plataforma',
  'contato',
  'dias',
  'periodo',
  'refused',
  'prime',
  'done',
  'error'
];

const intents = {
  STARTED: 'STARTED',
  ANSWER_ABOUT_NAME: 'ANSWER_ABOUT_NAME',
  ANSWER_ABOUT_SUBJECT: 'ANSWER_ABOUT_SUBJECT',
  ANSWER_ABOUT_SUBJECT_CONFIRMATION: 'ANSWER_ABOUT_SUBJECT_CONFIRMATION',
  ANSWER_ABOUT_PLATFORM: 'ANSWER_ABOUT_PLATFORM',
  ANSWER_ABOUT_PLATFORM_CONFIRMATION: 'ANSWER_ABOUT_PLATFORM_CONFIRMATION',
  ANSWER_ABOUT_WHEN: 'ANSWER_ABOUT_WHEN',
  FINISHED: 'FINISHED'
}

export const getIntent = {
  [inputs.STARTED]: intents.STARTED,
  [inputs.NAME]: intents.ANSWER_ABOUT_NAME,
  [inputs.SUBJECT]: intents.ANSWER_ABOUT_SUBJECT,
  [inputs.SUBJECT_CONFIRM]: intents.ANSWER_ABOUT_SUBJECT_CONFIRMATION,
  [inputs.SUBJECT_REFUSE]: intents.ANSWER_ABOUT_SUBJECT_CONFIRMATION,
  [inputs.PLATFORM]: intents.ANSWER_ABOUT_PLATFORM,
  [inputs.PLATFORM_CONFIRM]: intents.ANSWER_ABOUT_PLATFORM_CONFIRMATION,
  [inputs.PLATFORM_REFUSE]: intents.ANSWER_ABOUT_PLATFORM_CONFIRMATION,
  [inputs.WHEN]: intents.ANSWER_ABOUT_WHEN,
  [inputs.FINISHED]: intents.FINISHED
}