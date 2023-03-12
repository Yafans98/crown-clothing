import { createSelector } from "reselect";

//获取reducer
const selectCategoryReducer = (state) => state.categories;

//第一个参数矩阵是输入选择器，会作为第二个参数的函数输入
//因为是纯函数，所以刚开始会返回同一个空对象，不会重复执行reduce
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
)


export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)