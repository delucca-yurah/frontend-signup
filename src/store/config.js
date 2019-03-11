import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createTransform, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import pick from 'lodash/pick';
import sentry from './middlewares/sentry';
import messageQueue from './middlewares/messageQueue';
import genderize from './middlewares/genderize';
import inputToggler from './middlewares/inputToggler';
import answers from './middlewares/answers';
import signup from './middlewares/signup';
import rootReducer from './rootReducer';
import initialState from './initialState';
import migrations from './migrations';

const middlewares = [
  thunkMiddleware,
  sentry,
  messageQueue, 
  genderize,
  inputToggler,
  answers,
  signup
];
if(process.env.NODE_ENV === 'development') middlewares.push(logger);

const makeConfiguredStore = (reducer, initialState) =>
  createStore(reducer, initialState, compose(applyMiddleware(...middlewares)));

const blacklist = ['chat', 'core'];
const keys = ['inputs'];
const params = ['nome', 'plataforma', 'contato'];

const persistParams = createTransform(
  (inboundState, key) =>
    (keys.includes(key)) ?
      { ...initialState.inputs, ...pick(inboundState, params) } :
      inboundState
);

const persistedStore = (initialState) => {
  const persistConfig = {
    storage,
    blacklist,
    key: 'root',
    version: 1,
    transforms: [persistParams],
    migrate: createMigrate(migrations)
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = makeConfiguredStore(persistedReducer, initialState);

  store.__persistor = persistStore(store);

  return store;
}

export const makeStore = (initialState, { isServer }) =>
  (isServer) ?
    makeConfiguredStore(rootReducer, initialState):
    persistedStore(initialState)