//用户登录信息的Context
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/firebase/Reducer/Reducer.utils";
// 传入的是默认值，但不一定是初始值
export const UserContext = createContext({
  //需要null来判断是否有用户存在,因为{}也会被判定为true
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTION_TYPEs = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPEs.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null
}
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPEs.SET_CURRENT_USER, user))
  }

  const value = {
    currentUser,
    setCurrentUser
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      //如果是登录行为，则返回该用户对象在数据库中的文档引用或创建文档
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //signed out:null, signed in:User-Object
      setCurrentUser(user);
    });
    return unsubcribe;
  }, [])

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}