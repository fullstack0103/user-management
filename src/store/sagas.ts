import axios, { AxiosResponse } from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from './slices';

export function* getUsers() {
  const { data }: AxiosResponse<any, any> = yield call(() =>
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    }),
  );

  yield put(actions.setUsers(data));
}

function* getUsersApi() {
  yield put(actions.setIsLoading(true));

  try {
    yield getUsers();
  } catch (err) {
    console.log(err);
  }

  yield put(actions.setIsLoading(false));
}

export function* watchUsers() {
  yield takeLatest(actions.getUsersApi.type, getUsersApi);
}
