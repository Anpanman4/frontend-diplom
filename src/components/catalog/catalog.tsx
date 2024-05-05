import React, { FC, useState } from 'react';
import './catalog.scss';

import Offer from './offer/offer';
import { useDebounce } from '../../hooks/use-debounce';
import { ProductType, ProductCountType } from '../../http/types';
import catalog1 from '../../images/catalog-1.png';
import catalog2 from '../../images/catalog-2.png';
import catalog3 from '../../images/catalog-3.png';
import searchIcon from '../../images/svg/search.svg';
import { Filter } from '../theme/filter/filter';
import Input from '../theme/input/input';
import ProductCard from '../theme/product-card/product-card';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type CatalogProps = {
  products: ProductType[] | undefined;
  basketProducts: ProductCountType[] | undefined;
  addToBasket: (product: ProductType) => void;
  reduceFromBasket: (product: ProductType, count: number) => void;
};

const Catalog: FC<CatalogProps> = ({
  products,
  basketProducts,
  addToBasket,
  reduceFromBasket
}) => {
  const [inputData, setInputData] = useState('');
  const inputDebounced = useDebounce(inputData, 500);
  const currentContent = inputDebounced
    ? products?.filter((value) => value.title.includes(inputDebounced))
    : products;

  return (
    <section className="catalog">
      <Title className="catalog__title" level={1}>
        СТАЙЛИНГОВАЯ ЛИНЕЙКА HAIRGRAD
      </Title>
      <ul className="catalog__types">
        <li className="catalog__type">
          <Text level={4}>
            Продумана так, чтобы у всех была возможность экспериментировать с
            текстурами и подбирать свой стайлинговый коктейль.
          </Text>
          <img src={catalog1} alt="Текстура" loading="lazy" />
        </li>
        <li className="catalog__type">
          <Text level={4}>
            Все продукты на водной основе, за счет чего их максимально комфортно
            наносить и распределять по волосам.
          </Text>
          <img src={catalog2} alt="Текстура" loading="lazy" />
        </li>
        <li className="catalog__type">
          <Text level={4}>
            Стайлинг не перегружает волосы, что дает возможность создавать свой
            укладочный микс под определенный тип волос и стиль.
          </Text>
          <img src={catalog3} alt="Текстура" loading="lazy" />
        </li>
      </ul>
      <Title className="catalog__header" level={1}>
        Каталог
      </Title>
      <div className="catalog__search-container">
        <Input
          value={inputData}
          onChange={setInputData}
          icon={<img src={searchIcon} alt="" />}
          placeholder="Поиск"
          maxWidth="840px"
        />
        <Filter />
      </div>
      <ul className="catalog__container">
        {currentContent &&
          currentContent.map((product) => {
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
                img={product.image}
                count={currentCount?.count}
                addToBasket={() => addToBasket(product)}
                reduceFromBasket={() =>
                  reduceFromBasket(product, currentCount?.count ?? 0)
                }
              />
            );
          })}
      </ul>
      <Offer />
    </section>
  );
};

export default Catalog;
