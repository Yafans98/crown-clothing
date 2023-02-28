//auth服务
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,//谷歌身份验证
  createUserWithEmailAndPassword,//邮箱密码身份验证
  signInWithEmailAndPassword
} from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//使用的是firebase数据库
import {
  getFirestore,
  //doc允许在firebase中检索documents
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY--x6IqTMXS9XkIpkwZFIh_78soAG024",
  authDomain: "crown-clothing-64211.firebaseapp.com",
  projectId: "crown-clothing-64211",
  storageBucket: "crown-clothing-64211.appspot.com",
  messagingSenderId: "973503063321",
  appId: "1:973503063321:web:07e2958f82234c5649d188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

//自定义谷歌验证身份的行为
googleProvider.setCustomParameters({
  prompt: 'select_account',//与provider交互的用户必须提供特定账户
})

//谷歌身份验证
export const auth = getAuth();//Firebase自带的身份验证方法
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


//数据库
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  //参数：[数据库，collection名称，唯一ID(标识用)]
  const userDocRef = doc(db, 'users', userAuth.uid);
  //check是否存在存放对应doc的collection,没有的话谷歌还是会返回一个数据，类似指针，指向数据库中某个位置
  //可以用这个指针在数据库中插入数据
  const userSnapshot = await getDoc(userDocRef);

  //检查user data是否存在

  //如果不存在,创建一个
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        //如果邮箱登录，需要自己设置displayNam
        //若displayName为null,则扩展开add对象会重新给其赋值为用户填写的用户名
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //如果存在,返回该文档的引用
  return userDocRef;
}

//邮箱密码身份验证
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
//邮箱密码身份登录
export const signInWithAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}