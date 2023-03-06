import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems
} from './cart-dropdown.styles'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cart.context'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
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