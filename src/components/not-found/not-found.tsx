import React from 'react';
import './not-found.scss';

import { useNavigate } from 'react-router-dom';

import { Button } from '../theme/button/button';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <section className="not-found">
      <Title level={1}>ОШИБКА</Title>
      <h2 className="not-found__title">404</h2>
      <Text className="not-found__text" level={3}>
        {'Кажется, данной страницы не существует или она была удалена;('}
      </Text>
      <Button className="not-found__button" onClick={() => navigation('/')}>
        На главную
      </Button>
    </section>
  );
};

export default NotFound;
