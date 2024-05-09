import React, { FC, useState, useMemo, useEffect } from 'react';
import './offers.scss';

import { Link, useNavigate } from 'react-router-dom';

import { ProductCountType } from '../../http/types';
import { BreadCrumbs } from '../theme/breadcrumbs/breadcrumbs';
import { Button } from '../theme/button/button';
import Input from '../theme/input/input';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type OffersType = {
  breadCrumbsProduct?: { label: string; link: string };
  basketProducts?: ProductCountType[];
};

const Offers: FC<OffersType> = ({ breadCrumbsProduct, basketProducts }) => {
  const navigate = useNavigate();

  const [inputsValues, setInputsValues] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const items = useMemo(
    () =>
      breadCrumbsProduct
        ? [
            { label: 'Каталог', link: '/catalog' },
            {
              label: breadCrumbsProduct.label,
              link: `/catalog/${breadCrumbsProduct.link}`
            },
            { label: 'Корзина', link: '/basket' },
            { label: 'Оформление заказа', link: '/offers' }
          ]
        : [
            { label: 'Каталог', link: '/catalog' },
            { label: 'Корзина', link: '/basket' },
            { label: 'Оформление заказа', link: '/offers' }
          ],
    [breadCrumbsProduct]
  );

  const price = useMemo(
    () =>
      basketProducts?.reduce(
        (prev, curr) =>
          (curr.price ? Number(curr.price) : 600) * curr.count + prev,
        0
      ),
    [basketProducts]
  );

  useEffect(() => {
    if (!basketProducts) return navigate('/catalog');
  }, []);
  return (
    <section className="offers">
      <BreadCrumbs items={items} />
      <Title className="offers__title" level={1}>
        Оформление заказа
      </Title>
      <div className="offers__container">
        <div className="offers__inputs-container">
          <Title className="offers__inputs-title" level={3}>
            Контактная информация
          </Title>
          <Input
            value={inputsValues.name}
            onChange={(value) =>
              setInputsValues({ ...inputsValues, name: value })
            }
            label="ФИО*"
            maxWidth="620px"
          />
          <Input
            value={inputsValues.mobile}
            onChange={(value) =>
              setInputsValues({ ...inputsValues, mobile: value })
            }
            label="Номер телефона*"
            maxWidth="620px"
          />
          <Input
            value={inputsValues.email}
            onChange={(value) =>
              setInputsValues({ ...inputsValues, email: value })
            }
            label="Адрес эл.почты"
            maxWidth="620px"
          />
        </div>
        <div className="offers__offer">
          <div className="offers__head">
            <Title level={3}>Заказ</Title>
            <Link className="offers__link" to="/basket">
              Изменить
            </Link>
          </div>
          <div className="offers__content">
            {basketProducts?.map((product) => (
              <div key={product._id} className="offers__product">
                <img
                  className="offers__image"
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.title}
                />
                <div className="offers__product-container">
                  <Text level={4} weight="bold">
                    {product.title}
                  </Text>
                  <Text level={4} color="gray-1">
                    {product.price} ₽
                  </Text>
                </div>
              </div>
            ))}
            <div className="offers__product-datas">
              <div className="offers__product-data">
                <Input placeholder="Промокод" maxWidth="200px" />
                <div className="offers__product-price">
                  <Text level={4} color="gray-1">
                    Сумма
                  </Text>
                  <Text level={4} color="gray-1">
                    Скидка
                  </Text>
                </div>
                <Title level={4}>Итого</Title>
              </div>
              <div className="offers__product-data">
                <Button className="offers__promocode-button">Применить</Button>
                <div className="offers__product-price offers__product-price--right">
                  <Text level={4} color="gray-1">
                    {price} ₽
                  </Text>
                  <Text level={4} color="gray-1">
                    -100 ₽
                  </Text>
                </div>
                <Title level={4}>{(price ?? 0) - 100} ₽</Title>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => console.log(inputsValues)}
          disabled={!inputsValues.name || !inputsValues.mobile}
        >
          Заказать
        </Button>
      </div>
    </section>
  );
};

export default Offers;
