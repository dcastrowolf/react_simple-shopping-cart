import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { About, Store, Cart, NoPage } from './pages';
import { useCart, useProducts, ADD, INCREMENT, DECREMENT, RESET } from './hooks';
import { Content, Footer, Header } from './components';

import './App.css';

function App() {
  const products = useProducts();
  const [cart, dispatch] = useCart();

  const handleIncrement = (id) => {
    const product = products.filter((product) => product.id === id)[0];
    const { price, name } = product;

    if (Object.keys(cart.cart).includes(id.toString())) {
      dispatch({ type: INCREMENT, data: { id } });
    } else {
      dispatch({ type: ADD, data: { id, price, name } });
    }
  }

  const handleDecrement = (id) => {
    dispatch({ type: DECREMENT, data: { id } });
  }

  const handleReset = () => {
    dispatch({ type: RESET });
  }

  return (
    <div className="App">
      <Content>
        <Router>
          <Header cart={cart} />
          <Switch>
            <Route path="/about" component={About} />
            <Route exact path="/" component={
              () => <Store
                products={products}
                cart={cart}
                handleClick={handleIncrement}
              />}
            />
            <Route path="/cart" component={
              () => <Cart
                cart={cart}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleReset={handleReset}
              />}
            />
            <Route path="*" component={NoPage} />
          </Switch>
          <Footer />
        </Router>
      </Content>
    </div>
  );
}

export default App;
