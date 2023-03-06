import { createContext, useState, useEffect } from "react";

//向数据库写入数据
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

//数据
import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  //不要在useEffect中直接传递异步回调函数
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}