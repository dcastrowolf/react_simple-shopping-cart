import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

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

function Cart({ cart, handleIncrement, handleDecrement, handleReset }) {
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
          {cart.count ? Object.keys(cart.cart).map(key =>
            (
              <tr key={key}>
                <td>{cart.cart[key].name}</td>
                <td>
                  <button onClick={() => handleDecrement(Number(key))}>-</button>
                  {cart.cart[key].quantity}
                  <button onClick={() => handleIncrement(Number(key))}>+</button>
                </td>
                <td>$ {cart.cart[key].price}</td>
                <td>$ {cart.cart[key].price * cart.cart[key].quantity}</td>
              </tr>
            )
          ) :
            <tr><td colSpan="4">Cart empty</td></tr>
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>
            <td>$ {cart.total}</td>
          </tr>
        </tfoot>
      </table>
      {!!cart.count && <button onClick={handleReset}>Reset</button>}
    </CartWrapper>
  )
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
}

export default Cart;
