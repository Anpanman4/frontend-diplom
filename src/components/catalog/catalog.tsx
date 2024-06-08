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
    ? products?.filter((value) =>
        value.title.toLowerCase().includes(inputDebounced.toLowerCase())
      )
    : products;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [comment, setComment] = useState('');
  const [inputsError, setInputsError] = useState({
    name: '',
    mobile: '',
    comment: ''
  });

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
      </ul>
      <Offer
        title="Сотрудничество"
        about={[
          'Присоединяйтесь к комьюнити HairGrad!',
          'Оставьте свои контактные данные и мы предложим вам персональные акции для оптового заказа.'
        ]}
        inputs={[
          {
            value: name,
            setValue: (value) => {
              if (inputsError.name)
                setInputsError({ ...inputsError, name: '' });
              setName(value);
            },
            label: 'ФИО или Название организации',
            errorMessage: inputsError.name
          },
          {
            value: mobile,
            setValue: (value) => {
              if (inputsError.mobile)
                setInputsError({ ...inputsError, mobile: '' });
              setMobile(value);
            },
            label: 'Номер телефона',
            errorMessage: inputsError.mobile
          },
          {
            value: comment,
            setValue: setComment,
            label: 'Комментарии'
          }
        ]}
        onClick={async (e) => {
          if (!name) setInputsError({ ...inputsError, name: 'Заполните имя' });
          if (!mobile)
            setInputsError({
              ...inputsError,
              mobile: 'Заполните номер телефона'
            });
          if (!name || !mobile) return '';
          e.preventDefault();
          const data = new FormData();
          data.append('name', name);
          data.append('mobile', mobile);
          data.append('comment', comment);
          try {
            await fetch(
              'https://script.google.com/macros/s/AKfycbydoep_DiyKJh38Z064uXTuC47wFw6S1KIdK1ndM6Hvq30fTGyl0uQ4nM5EEngkzbv3/exec',
              {
                method: 'POST',
                body: data
              }
            );
            setName('');
            setMobile('');
            setComment('');
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </section>
  );
};

export default Catalog;
