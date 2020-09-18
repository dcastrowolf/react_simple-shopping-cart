import { useState, useEffect } from 'react';
import data from '../data/products.json';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []);

  return products;
};
