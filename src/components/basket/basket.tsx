import React, { FC } from 'react';
import './basket.scss';

import { useNavigate } from 'react-router-dom';

import { ProductCountType, ProductType } from '../../http/types';
import CrossIcon from '../../images/svg/cross.svg';
import { BreadCrumbs } from '../theme/breadcrumbs/breadcrumbs';
import { Button } from '../theme/button/button';
import { CountButton } from '../theme/count-button/count-button';
import ProductCard from '../theme/product-card/product-card';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type BasketProps = {
  products?: ProductType[];
  breadCrumbsProduct?: { label: string; link: string };
  basketProducts?: ProductCountType[];
  addToBasket: (product: ProductType) => void;
  reduceFromBasket: (product: ProductType, count: number) => void;
};

const Basket: FC<BasketProps> = ({
  products,
  breadCrumbsProduct,
  basketProducts,
  addToBasket,
  reduceFromBasket
}) => {
  const navigation = useNavigate();

  const items = breadCrumbsProduct
    ? [
        { label: 'Каталог', link: '/catalog' },
        {
          label: breadCrumbsProduct.label,
          link: `/catalog/${breadCrumbsProduct.link}`
        },
        { label: 'Корзина', link: '/basket' }
      ]
    : [
        { label: 'Каталог', link: '/catalog' },
        { label: 'Корзина', link: '/basket' }
      ];

  const price = basketProducts?.reduce(
    (prev, curr) => (curr.price ? Number(curr.price) : 600) * curr.count + prev,
    0
  );
  return (
    <section className="basket">
      <BreadCrumbs items={items} />
      <div className="basket__container">
        <Title level={1}>Корзина</Title>
        {basketProducts?.length ? (
          basketProducts.map((value) => (
            <>
              <div key={value._id} className="basket__product">
                <img
                  className="basket__product-image"
                  src={`http://localhost:8000/${value.image}`}
                  alt={value.title}
                />
                <div className="basket__product-info">
                  <Title>{value.title}</Title>
                  <Text
                    className="basket__product-text"
                    level={3}
                    color="gray-1"
                  >
                    30 мл<div className="basket__product-circle"></div>
                    {value.count} шт
                  </Text>
                  <img
                    className="basket__product--cross"
                    src={CrossIcon}
                    alt=""
                    onClick={() => reduceFromBasket(value, 1)}
                  />
                  <div className="basket__product-controls">
                    <CountButton
                      isMinus={true}
                      size="small"
                      onClick={() => reduceFromBasket(value, value.count)}
                    />
                    <Text level={3} color="black">
                      {value.count}
                    </Text>
                    <CountButton
                      isMinus={false}
                      size="small"
                      onClick={() => addToBasket(value)}
                    />
                    <Title className="basket__product-price" level={3}>
                      {value.price || 600} ₽
                    </Title>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <Text level={3} color="gray-1">
            В корзине ничего нет;(
          </Text>
        )}
        {basketProducts?.length && (
          <div className="basket__price-container">
            <Title level={2}>Итого</Title>
            <Title level={2}>{price || 0} ₽</Title>
          </div>
        )}
        <Button
          className="basket__button"
          onClick={() =>
            basketProducts?.length
              ? navigation('/offers')
              : navigation('/catalog')
          }
        >
          {basketProducts?.length ? 'Оформить заказ' : 'В каталог'}
        </Button>
      </div>
      <div className="basket__more">
        <Title level={1}>Рекомендуемое вам</Title>
        <div className="basket__products">
          {products?.slice(0, 3).map((product) => {
            const currentCount = basketProducts
              ? basketProducts.find(
                  (basketProduct) => basketProduct._id === product._id
                )
              : undefined;
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price ? product.price : '600'}
                volume={product.volume}
                img={product.image}
                count={currentCount?.count}
                addToBasket={() => addToBasket(product)}
                reduceFromBasket={() =>
                  reduceFromBasket(product, currentCount?.count ?? 0)
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Basket;
