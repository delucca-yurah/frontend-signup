import { combineReducers } from 'redux';
import chatReducers from '../modules/chat/reducers';
import inputReducers from '../modules/inputs/reducers';
import coreReducers from '../modules/core/reducers';
import * as chat from '../modules/chat/constants';
import * as inputs from '../modules/inputs/constants';
import * as core from '../modules/core/constants';

export default combineReducers({
  [chat.NAME]: chatReducers,
  [inputs.NAME]: inputReducers,
  [core.NAME]: coreReducers
});