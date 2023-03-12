import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_ACTION_TYPEs } from './user.types'
import { signInSuccess, signInFailed, signUpSuccess, signOutFailed, signOutSuccess } from './user.action'
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from '../../utils/firebase/firebase.utils'

//注意从上往下的顺序!辅助函数=>action入口函数


//如果用户已登录的saga
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    //id在snapshot中，因此要做以下处理👇
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

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

//下面是登录部分
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPEs.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPEs.EMAIL_SIGN_IN_START, signInWithEmail)
}


//下面是邮箱+密码注册部分
export function* signInAfterSignUp({ payload: { user, addtionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, addtionalDetails);
}
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPEs.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    //注意action中signUpSuccess的参数
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPEs.SIGN_UP_START, signUp)
}

//下面是注销部分
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPEs.SIGN_OUT_START, signOut);
}



export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
}