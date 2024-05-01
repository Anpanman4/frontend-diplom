import React, { useEffect, useState } from 'react';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import api from '../../http/api';
import { ProductType } from '../../http/types';
import Catalog from '../catalog/catalog';
import Education from '../education/education';
import Header from '../header/header';
import Main from '../main/main';

const App = () => {
  const [products, setProducts] = useState<ProductType[] | undefined>(
    undefined
  );

  useEffect(() => {
    api.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Header />
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
