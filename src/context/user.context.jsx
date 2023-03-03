//用户登录信息的Context
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// 传入的是默认值，但不一定是初始值
export const UserContext = createContext({
  //需要null来判断是否有用户存在,因为{}也会被判定为true
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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