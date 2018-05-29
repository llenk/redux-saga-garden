import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import App from './App';

function* rootSaga() {
  // yield takeEvery('SET_ELEMENTS', firstSaga);
  yield takeEvery('GET_PLANTS', getPlants);
}

function* getPlants() {
  try {
    const plantResponse = yield call(axios.get, '/api/plant');
    yield put({
      type: 'ADD_PLANTS',
      payload: plantResponse.data,
    });
  } catch (error) {
    console.log(error);
  }
}

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    case 'ADD_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
