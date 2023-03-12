//编写自己的中间件
export const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());
  //为了获取新的state,需要先执行reducer,即将action传下去
  next(action);

  console.log('next state', store.getState());
}