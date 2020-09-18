import { useReducer } from 'react';

const initialState = {
  cart: {},
  total: 0,
  count: 0,
};

export const ADD = 'ADD';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

const totalCart = (cart) => {
  let count = 0;
  let total = 0;

  Object.keys(cart).forEach(key => {
    count += cart[key].quantity;
    total += cart[key].price * cart[key].quantity;
  });

  return { count, total };
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD: {
      const id = action.data.id;
      const cart = {
        ...state.cart,
        [id]: {
          product: id,
          name: action.data.name,
          price: action.data.price,
          quantity: 1,
        }
      };

      return {
        ...state,
        ...totalCart(cart),
        cart
      };
    }
    case INCREMENT: {
      const id = action.data.id;
      const cart = {
        ...state.cart,
        [id]: {
          ...state.cart[id],
          quantity: state.cart[id].quantity + 1,
        }
      };

      return {
        ...state,
        ...totalCart(cart),
        cart
      };
    };
    case DECREMENT: {
      const id = action.data.id;
      const quantity = state.cart[id].quantity;
      let cart = {
        ...state.cart,
        [id]: {
          ...state.cart[id],
          quantity: state.cart[id].quantity - 1,
        }
      };

      if (quantity - 1 === 0) {
        delete (cart[id]);
      }

      return {
        ...state,
        ...totalCart(cart),
        cart
      }
    };
    case RESET:
      return {
        ...initialState
      };
    default:
      return {
        ...state
      };
  }
};

export const useCart = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const cartDispatch = (action) => {
    dispatch(action);
  }

  return [cart, cartDispatch];
}