import { createContext, useReducer } from 'react'
import { createAction } from '../utils/firebase/Reducer/Reducer.utils';

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export const CartContext = createContext({
  isCartOpen: false,//是否显示购物车
  setIsCartOpen: () => { },//控制
  cartItems: [],//购物车商品
  addItemToCart: () => { },//添加
  removeItemFromCart: () => { },//删除
  claerItemFromCart: () => { },//清空购物车
  cartCount: 0,//购物车总数
  cartTotal: 0//总价
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => { }
}

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //只要购物车内商品更新，就变化总数/总价等
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandle type of ${type} in cartReducer`);
  }
}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

  //增删改数据库元素
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) =>
      total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) =>
      total + cartItem.quantity * cartItem.price, 0);
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount
    }
    )
    )
  }

  //显示/隐藏购物车
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems);
  }

  const claerItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems);
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    claerItemFromCart,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

