import React, { FC } from 'react';
import './product-card.scss';

import { Text } from '../text/text';
import { Title } from '../title/title';

export type ProductCardProps = {
  title: string;
  price: string;
};

const ProductCard: FC<ProductCardProps> = ({ title, price }) => {
  return (
    <li className="product-card">
      <Title className="product-card__title">{title}</Title>
      <Text className="product-card__title">{price}</Text>
      <button>Добавить в корзину</button>
    </li>
  );
};

export default ProductCard;
