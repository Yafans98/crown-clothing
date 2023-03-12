import { USER_ACTION_TYPEs } from "./user.types";


const INITIAL_STATE = {
  currentUser: null
}

//没有useReducer Hook了,因此在这里直接给state一个初始值
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPEs.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      //由于redux只有一个root reducer,当这个reducer不该动作时，直接返回state
      //这样redux就知道,这个reducer不用更新,对重渲染比较重要
      return state;
  }
}
