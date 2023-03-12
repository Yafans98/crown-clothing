import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPE } from './category.types';



export function* fetchCategoriesAsync() {
  try {
    //之前需要await的地方用yield和call代替，第一个参数为异步函数，第二个参数为传入该异步函数的参数
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    //之前需要用dispatch的地方用put代替
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}


export function* onFetchCategories() {
  //如果有一堆action,则取最近的action
  //如果最近的action是fetchStart,就调用fetchAsync函数
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  )
}


export function* categoriesSaga() {
  //all()中的所有事件都完成后代码才会继续运行
  yield all([call(onFetchCategories)]);
}