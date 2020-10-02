import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { About, Store, Cart, NoPage } from './pages';
import { useProducts } from './hooks';
import { Content, Footer, Header } from './components';
import { CartContextProvider } from './context/CartContext';

import './App.css';

function App() {
  const products = useProducts();

  return (
    <div className="App">
      <CartContextProvider>
        <Content>
          <Router>
            <Header />
            <Switch>
              <Route path="/about" component={About} />
              <Route
                exact
                path="/"
                component={() => <Store products={products} />}
              />
              <Route path="/cart" component={() => <Cart products={products} />} />
              <Route path="*" component={NoPage} />
            </Switch>
            <Footer />
          </Router>
        </Content>
      </CartContextProvider>
    </div>
  );
}

export default App;
