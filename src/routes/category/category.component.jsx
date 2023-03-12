import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../store/categories/category.selector';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss'
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      {
        isLoading ? <Spinner /> : (
          <div className='category-container'>
            {
              products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
          </div>
        )
      }
    </>)
}

export default Category