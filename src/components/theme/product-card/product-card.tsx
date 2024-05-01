import React, { FC } from 'react';
import './product-card.scss';

import { Button } from '../button/button';
import { Text } from '../text/text';

export type ProductCardProps = {
  title: string;
  price: string;
  img: string;
};

const ProductCard: FC<ProductCardProps> = ({ title, price, img }) => {
  return (
    <li className="product-card">
      <img
        className="product-card__img"
        src={`http://localhost:8000/${img}`}
        alt={title}
        loading="lazy"
      />
      <Text className="product-card__title" level={1}>
        {title}
      </Text>
      <Text className="product-card__price" level={1}>
        {price}₽
      </Text>
      <Button className="product-card__button">Добавить в корзину</Button>
    </li>
  );
};

export default ProductCard;
