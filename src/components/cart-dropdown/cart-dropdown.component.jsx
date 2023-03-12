import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'


const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);

  //返回一个NavigateFunction
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <CartDropDownContainer>
      <CartItems>
        {
          cartItems.length ? (cartItems.map(item =>
            <CartItem cartItem={item} key={item.id} />
          )) : (
            <EmptyMessage>Your Cart is Empty</EmptyMessage>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  )

}

export default CartDropDown;