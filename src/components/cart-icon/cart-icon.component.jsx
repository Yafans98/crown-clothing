import { useContext } from 'react'
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount
} from './cart-icon.styles.jsx';
import { CartContext } from '../../context/cart.context';
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;