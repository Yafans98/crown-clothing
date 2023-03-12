import { takeLatest, put, all, call } from 'redux-saga/effects'

import { USER_ACTION_TYPEs } from './user.types'

import { signInSuccess, signInFailed } from './user.action'

import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

//注意从上往下的顺序!

//如果用户已登录的saga
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    console.log(userSnapshot);

  } catch (error) {
    yield put(signInFailed(error))
  }
}

//调用工具函数的saga
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error))
  }
}

//根据action类型调用对应的saga
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPEs.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
  yield all([call(onCheckUserSession)]);
}