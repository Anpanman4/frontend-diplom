import React, { useEffect, useState } from 'react';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import { ProductType } from 'http/types';

import api from '../../http/api';
import Catalog from '../catalog/catalog';
import Education from '../education/education';
import Main from '../main/main';

const App = () => {
  const [products, setProducts] = useState<ProductType[] | []>([]);

  useEffect(() => {
    api.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <main className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalog" element={<Catalog products={products} />} />
          <Route path="/education" element={<Education />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
