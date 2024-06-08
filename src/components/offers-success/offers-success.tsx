import React, { FC } from 'react';
import './offers-success.scss';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../theme/button/button';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type OffersSuccessType = {};

const OffersSuccess: FC<OffersSuccessType> = () => {
  const navigate = useNavigate();

  return (
    <section className="offers-success">
      <Title level={1}>Спасибо за заказ!</Title>
      <Text className="offers-success__text" level={3}>
        Ваш заказ №1232 успешно оформлен!
        <br />
        Информацию о состоянии заказа можно просматривать в{' '}
        <Link className="offers-success__link" to="/personal">
          Личном кабинете
        </Link>
        .
      </Text>
      <Button
        className="offers-success__button"
        onClick={() => navigate('/catalog')}
      >
        Продолжить покупки
      </Button>
    </section>
  );
};

export default OffersSuccess;
