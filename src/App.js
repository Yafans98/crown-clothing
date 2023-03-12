import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Home from './routes/Home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
const App = () => {
  //dispatch不会更改，因为redux只有一个dispatch，但react不知道，所以如果不把dispatch加入依赖会有Lint warning
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      //如果是登录行为，则返回该用户对象在数据库中的文档引用或创建文档
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //signed out:null, signed in:User-Object
      dispatch(setCurrentUser(user));
    });
    return unsubcribe;
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes >
  )
}

export default App;


