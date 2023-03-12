import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


//添加商品到购物车的辅助函数
const addCartItem = (cartItems, productToAdd) => {
  //查询是否cartItems已拥有productToAdd
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === productToAdd.id);

  //如果存在，数量+1
  if (existingCartItem) {
    return cartItems.map(
      cartItem => cartItem.id === productToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  //只要运行到这里，说明购物车没有要添加的商品
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

//删除商品的辅助函数
const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the item to remove
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToRemove.id);
  //check if quantity is equal to 1,if it is then remove
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  //return back cartItems with reduced quantity
  return cartItems.map(
    cartItem => cartItem.id === cartItemToRemove.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

//清空购物车的辅助函数
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}



export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}