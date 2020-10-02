import React, { useState, useContext } from 'react';

const initialState = {
  cart: {},
  total: 0,
  count: 0,
};

export const CartContext = React.createContext(initialState);

const totalCart = (cart) => {
  let count = 0;
  let total = 0;

  Object.keys(cart).forEach((key) => {
    count += cart[key].quantity;
    total += cart[key].price * cart[key].quantity;
  });

  return { count, total };
};

export function CartContextProvider(props) {
  const [state, setState] = useState(initialState);
  const { cart, total, count } = state;

  const addProductToCart = (product) => {
    const { id, name, price } = product;
    const cart = {
      ...state.cart,
      [id]: {
        product: id,
        name,
        price,
        quantity: 1,
      },
    };

    setState({
      ...state,
      ...totalCart(cart),
      cart,
    });
  };

  const incrementProductQuantityToCart = (product) => {
    const { id } = product;
    const cart = {
      ...state.cart,
      [id]: {
        ...state.cart[id],
        quantity: state.cart[id].quantity + 1,
      },
    };

    setState({
      ...state,
      ...totalCart(cart),
      cart,
    });
  };

  const decrementProductQuantityToCart = (product) => {
    const { id } = product;
    const quantity = state.cart[id].quantity;
    let cart = {
      ...state.cart,
      [id]: {
        ...state.cart[id],
        quantity: quantity - 1,
      },
    };

    if (quantity - 1 === 0) {
      delete cart[id];
    }

    setState({
      ...state,
      ...totalCart(cart),
      cart,
    });
  };

  const resetCart = () => {
    setState({
      ...initialState,
    });
  };

  const value = {
    cart,
    total,
    count,
    add: addProductToCart,
    increment: incrementProductQuantityToCart,
    decrement: decrementProductQuantityToCart,
    reset: resetCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};


export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error('No Provider');
    return context;
};