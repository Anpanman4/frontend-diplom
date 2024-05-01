import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import api from '../../http/api';
import { ProductCountType, ProductType } from '../../http/types';
import Catalog from '../catalog/catalog';
import Education from '../education/education';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';

const App = () => {
  const [products, setProducts] = useState<ProductType[] | undefined>(
    undefined
  );
  const [basketProducts, setBasketProducts] = useState<
    ProductCountType[] | undefined
  >(undefined);

  const addToBasket = (product: ProductType) => {
    const alreadyExistProduct = basketProducts?.find(
      (productValue) => productValue._id === product._id
    );
    if (alreadyExistProduct && basketProducts) {
      const countProduct = alreadyExistProduct.count;
      const basketProductsMiddle = basketProducts.map((basketProductValue) => {
        return basketProductValue._id === alreadyExistProduct._id
          ? { ...alreadyExistProduct, count: countProduct + 1 }
          : basketProductValue;
      });
      return setBasketProducts(basketProductsMiddle);
    }
    if (basketProducts)
      return setBasketProducts([...basketProducts, { ...product, count: 1 }]);
    setBasketProducts([{ ...product, count: 1 }]);
  };

  const reduceFromBasket = (product: ProductType, count: number) => {
    if (!basketProducts) return;
    const newProducts = basketProducts?.map((productValue) =>
      productValue._id === product._id
        ? { ...product, count: count - 1 }
        : productValue
    );
    setBasketProducts(newProducts);
  };

  const basketCount = useMemo(() => {
    return basketProducts?.reduce((prev, cur) => prev + cur.count, 0);
  }, [basketProducts]);

  useEffect(() => {
    api.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Header basketCount={basketCount} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/catalog"
            element={
              <Catalog
                products={products}
                basketProducts={basketProducts}
                addToBasket={addToBasket}
                reduceFromBasket={reduceFromBasket}
              />
            }
          />
          <Route path="/education" element={<Education />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
