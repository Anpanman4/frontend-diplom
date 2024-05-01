import React, { FC, useState } from 'react';
import './catalog.scss';

import { useDebounce } from '../../hooks/use-debounce';
import { ProductType } from '../../http/types';
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
};

const Catalog: FC<CatalogProps> = ({ products }) => {
  const [inputData, setInputData] = useState('');
  const inputDebounced = useDebounce(inputData, 500);
  const currnetContent = inputDebounced
    ? products?.filter((value) => value.title.includes(inputDebounced))
    : products;
  return (
    <section className="catalog">
      <Title className="catalog__title" level={1}>
        СТАЙЛИНГОВАЯ ЛИНЕЙКА HAIRGRAD
      </Title>
      <ul className="catalog__types">
        <li className="catalog__type">
          <Text>
            Продумана так, чтобы у всех была возможность экспериментировать с
            текстурами и подбирать свой стайлинговый коктейль.
          </Text>
          <img src={catalog1} alt="Текстура" loading="lazy" />
        </li>
        <li className="catalog__type">
          <Text>
            Все продукты на водной основе, за счет чего их максимально комфортно
            наносить и распределять по волосам.
          </Text>
          <img src={catalog2} alt="Текстура" loading="lazy" />
        </li>
        <li className="catalog__type">
          <Text>
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
        {currnetContent &&
          currnetContent.map((product) => {
            return (
              <ProductCard
                key={product._id}
                title={product.title}
                price={product.price ? product.price : '600'}
                img={product.image}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Catalog;
