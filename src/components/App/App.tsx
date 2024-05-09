import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';

import { Route, Routes, useLocation } from 'react-router-dom';

import api from '../../http/api';
import { ProductCountType, ProductType } from '../../http/types';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import Contacts from '../contacts/contacts';
import Education from '../education/education';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import Offers from '../offers/offers';
import ProductId from '../product-id/product-id';
import SignIn from '../sign/sign-in/sign-in';
import SignUp from '../sign/sign-up/sign-up';

const App = () => {
  const [products, setProducts] = useState<ProductType[] | undefined>(
    undefined
  );
  const [basketProducts, setBasketProducts] = useState<
    ProductCountType[] | undefined
  >(undefined);
  const [breadCrumbsProduct, setBreadCrumbsProduct] = useState<
    { label: string; link: string } | undefined
  >(undefined);

  const location = useLocation();

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
    if (count === 1) {
      const newProducts = basketProducts.filter(
        (productValue) => productValue._id !== product._id
      );
      setBasketProducts(newProducts);
      return;
    }
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {['/sign-in', '/sign-up'].includes(location.pathname) ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      ) : (
        <>
          <Header
            basketCount={basketCount}
            setBreadCrumbsProduct={setBreadCrumbsProduct}
          />
          <main className="page">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    products={products}
                    basketProducts={basketProducts}
                    addToBasket={addToBasket}
                    reduceFromBasket={reduceFromBasket}
                  />
                }
              />
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
              <Route
                path="/catalog/:id"
                element={
                  <ProductId
                    products={products}
                    basketProducts={basketProducts}
                    addToBasket={addToBasket}
                    reduceFromBasket={reduceFromBasket}
                    setBreadCrumbsProduct={setBreadCrumbsProduct}
                  />
                }
              />
              <Route path="/education" element={<Education />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/basket"
                element={
                  <Basket
                    products={products}
                    breadCrumbsProduct={breadCrumbsProduct}
                    basketProducts={basketProducts}
                    addToBasket={addToBasket}
                    reduceFromBasket={reduceFromBasket}
                  />
                }
              />
              <Route
                path="/offers"
                element={
                  <Offers
                    breadCrumbsProduct={breadCrumbsProduct}
                    basketProducts={basketProducts}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
