import React, { FC } from 'react';
import './product-card.scss';

import { useNavigate } from 'react-router-dom';

import { Button } from '../button/button';
import { CountButton } from '../count-button/count-button';
import { Text } from '../text/text';

export type ProductCardProps = {
  id: string;
  title: string;
  price: string;
  img: string;
  count?: number;
  addToBasket: () => void;
  reduceFromBasket: () => void;
};

const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  img,
  count,
  addToBasket,
  reduceFromBasket
}) => {
  const navigation = useNavigate();

  return (
    <li className="product-card" onClick={() => navigation(`${id}`)}>
      <img
        className="product-card__img"
        src={`http://localhost:8000/${img}`}
        alt={title}
        loading="lazy"
      />
      <Text className="product-card__title" level={3}>
        {title}
      </Text>
      <Text className="product-card__price" level={3}>
        {price}₽
      </Text>
      {count ? (
        <div
          className="product-card__controls"
          onClick={(e) => e.stopPropagation()}
        >
          <CountButton isMinus={true} onClick={() => reduceFromBasket()} />
          <Text level={3}>{count}</Text>
          <CountButton isMinus={false} onClick={() => addToBasket()} />
        </div>
      ) : (
        <Button
          className="product-card__button"
          onClick={(e) => {
            e.stopPropagation();
            addToBasket();
          }}
        >
          В корзину
        </Button>
      )}
    </li>
  );
};

export default ProductCard;
