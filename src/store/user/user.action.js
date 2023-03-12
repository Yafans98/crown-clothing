import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPEs } from "./user.types"

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPEs.SET_CURRENT_USER, user)


export const checkUserSession = () => createAction(USER_ACTION_TYPEs.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPEs.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPEs.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) => createAction(USER_ACTION_TYPEs.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(USER_ACTION_TYPEs.SIGN_IN_FAILED, error);


//sign-up
export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPEs.SIGN_UP_START, { email, password, displayName });

export const signUpSuccess = (user, addtionalDetails) =>
  createAction(USER_ACTION_TYPEs.SIGN_UP_SUCCESS, { user, addtionalDetails });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPEs.SIGN_UP_FAILED, error)

//sign-out
export const signOutStart = () => createAction(USER_ACTION_TYPEs.SIGN_OUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_TYPEs.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) => createAction(USER_ACTION_TYPEs.SIGN_OUT_FAILED, error);