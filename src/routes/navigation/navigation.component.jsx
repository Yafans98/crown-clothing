import { Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"
import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinks
} from './navigation.styles.jsx'
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrownLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>)}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}


export default Navigation;
