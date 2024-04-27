import React, { FC } from 'react';
import './catalog.scss';

import ProductCard from 'components/theme/product-card/product-card';
import { ProductType } from 'http/types';

export type CatalogProps = {
  products: ProductType[] | [];
};

const Catalog: FC<CatalogProps> = ({ products }) => {
  return (
    <section className="catalog">
      <ul className="catalog__container">
        {products.map((product) => (
          <ProductCard title={product.title} price="600" />
        ))}
      </ul>
    </section>
  );
};

export default Catalog;
