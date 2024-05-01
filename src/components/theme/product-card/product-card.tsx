import React, { FC } from 'react';
import './product-card.scss';

import { Button } from '../button/button';
import { CountButton } from '../count-button/count-button';
import { Text } from '../text/text';

export type ProductCardProps = {
  title: string;
  price: string;
  img: string;
  count?: number;
  addToBasket: () => void;
  reduceFromBasket: () => void;
};

const ProductCard: FC<ProductCardProps> = ({
  title,
  price,
  img,
  count,
  addToBasket,
  reduceFromBasket
}) => {
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
      {count ? (
        <div className="product-card__controls">
          <CountButton isMinus={true} onClick={() => reduceFromBasket()} />
          <Text level={3}>{count}</Text>
          <CountButton isMinus={false} onClick={() => addToBasket()} />
        </div>
      ) : (
        <Button className="product-card__button" onClick={() => addToBasket()}>
          Добавить в корзину
        </Button>
      )}
    </li>
  );
};

export default ProductCard;
