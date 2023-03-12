import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.components'
import Category from '../category/category.component'
import { fetchCategoriesStart } from '../../store/categories/category.action'
import { useDispatch } from 'react-redux'
import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //异步获取数据
    dispatch(fetchCategoriesStart());
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}

export default Shop