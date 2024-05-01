import React, { FC } from 'react';
import './catalog.scss';

import { ProductType } from '../../http/types';
import Input from '../theme/input/input';
import ProductCard from '../theme/product-card/product-card';

export type CatalogProps = {
  products: ProductType[] | undefined;
};

const Catalog: FC<CatalogProps> = ({ products }) => {
  return (
    <section className="catalog">
      <Input />
      <ul className="catalog__container">
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                title={product.title}
                price={product.price ? product.price : '600'}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Catalog;
