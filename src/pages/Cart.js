import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartWrapper = styled.div`
  table {
    margin: 0 auto;
    width: 80%;

    thead tr td,
    tbody tr td {
      border-bottom: 1px solid #666666;
    }

    td {
      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  button {
    border: 1px solid #000000;
    background: transparent;
    cursor: pointer;
    margin: 0 10px;
  }
`;

function Cart({ products }) {
  const { cart, total, count, increment, decrement, reset } = useCart();

  const handleDecrement = (id) => {
    const product = products.filter((product) => product.id === id)[0];
    decrement(product);
  };

  const handleIncrement = (id) => {
    const product = products.filter((product) => product.id === id)[0];
    increment(product);
  };

  return (
    <CartWrapper>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Value</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {count ? (
            Object.keys(cart).map((key) => (
              <tr key={key}>
                <td>{cart[key].name}</td>
                <td>
                  <button onClick={() => handleDecrement(Number(key))}>
                    -
                  </button>
                  {cart[key].quantity}
                  <button onClick={() => handleIncrement(Number(key))}>
                    +
                  </button>
                </td>
                <td>$ {cart[key].price}</td>
                <td>$ {cart[key].price * cart[key].quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cart empty</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>
            <td>$ {total}</td>
          </tr>
        </tfoot>
      </table>
      {!!count && <button onClick={() => reset()}>Reset</button>}
    </CartWrapper>
  );
}

Cart.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Cart;
