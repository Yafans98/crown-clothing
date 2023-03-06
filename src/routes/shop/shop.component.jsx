import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.components'
import Category from '../category/category.component'
import { Routes, Route } from 'react-router-dom'

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  )
}

export default Shop