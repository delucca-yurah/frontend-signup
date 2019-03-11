import { NAME } from './constants';

export const isProduction = state => state[NAME].env === 'production';