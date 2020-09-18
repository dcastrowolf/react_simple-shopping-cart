import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const StoreWrapper = styled.div`
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;

  li {
    flex: 0 0 30%;
    margin-bottom: 30px;

    .name {
      font-size: 22px;
      font-weight: bold;
    }

    .price {
      font-size: 14px;
      font-weight: bold;
    }

    button {
      border: 1px solid #000000;
      background: transparent;
      cursor: pointer;
    }
  }
}
`;

function Store({ products, cart, handleClick }) {
  return (
    <StoreWrapper>
      <ul>
        {products.length && products.map((product, index) =>
          <li key={index}>
            <p className="name">{product.name}</p>
            <p className="price">$ {product.price}</p>
            <button onClick={() => handleClick(product.id)}>{
              Object.keys(cart.cart).includes(product.id.toString()) ?
                "More" : "Add"
            }</button>
          </li>
        )}
      </ul>
    </StoreWrapper>
  )
}

Store.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Store;
