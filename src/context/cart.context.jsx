import { createContext, useEffect, useState } from 'react'

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) =>
      total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) =>
      total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])



  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const claerItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
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

