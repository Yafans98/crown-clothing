//auth服务
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,//谷歌身份验证
  createUserWithEmailAndPassword,//邮箱密码身份验证
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

  collection,//获取一个collection引用，可DocRef类似
  writeBatch,//批次写入数据库的方法

  query,
  getDocs//查询用方法

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
initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

//自定义谷歌验证身份的行为
googleProvider.setCustomParameters({
  prompt: 'select_account',//与provider交互的用户必须提供特定账户
})

//谷歌身份验证
export const auth = getAuth();//Firebase自带的身份验证方法

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


//数据库
export const db = getFirestore();

//添加内容到数据库
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  //新建一个batch
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //获取document引用
    const docRef = doc(collectionRef, object.title.toLowerCase());
    //将数据写入docRef,即使Ref不存在，Firebase也会给一个引用，写入操作可直接在这个引用上新建文档并写入
    batch.set(docRef, object);
  })
  //等待写入完成
  await batch.commit();
  console.log('done');
}

//从数据库读取数据
export const getCategoriesAndDocuments = async (key) => {
  const collectionRef = collection(db, key);

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

//用户登录信息保存
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

//注销
export const signOutUser = async () => await signOut(auth);

//集中管理
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//获取当前用户
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        //获取到值之后直接取消监听，防止监听器始终active，造成内存泄漏
        unsubscribe();
        resolve(userAuth);
      },
      //第三个参数：当获取用户信息出错时调用的函数，给reject即可
      reject
    )
  })
}