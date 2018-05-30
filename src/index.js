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
  yield takeEvery('ADD_PLANT', addPlant);
  yield takeEvery('DELETE_PLANT', deletePlant);
}

function* getPlants() {
  try {
    const plantResponse = yield call(axios.get, '/api/plant');
    yield put({
      type: 'PLANT_LIST',
      payload: plantResponse.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* addPlant(action) {
  try {
    yield call(axios.post, '/api/plant', action.payload);
    yield put({type: 'GET_PLANTS'});
  } catch (error) {
    console.log(error);
  }
}

function* deletePlant(action) {
  try {
    yield call(axios.delete, '/api/plant/?id=' + action.payload);
    yield put({type: 'GET_PLANTS'});
  } catch (error) {
    console.log(error);
  }
}

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'PLANT_LIST':
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
