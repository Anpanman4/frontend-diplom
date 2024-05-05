import React, { FC, useState } from 'react';
import './offer.scss';

import { Button } from '../../theme/button/button';
import Input from '../../theme/input/input';
import { Text } from '../../theme/text/text';
import { Title } from '../../theme/title/title';

export type OfferType = {};

const Offer: FC<OfferType> = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className="offer">
      <div className="offer__info">
        <Title level={1}>Сотрудничество</Title>
        <Text className="offer__description" level={4}>
          Присоединяйтесь к комьюнити HairGrad!
          <br />
          Оставьте свои контактные данные и мы предложим вам персональные акции
          для оптового заказа.
        </Text>
      </div>
      <form className="offer__form">
        <Input
          value={name}
          onChange={setName}
          label="ФИО или Название организации"
          maxWidth="none"
        />
        <Input
          value={mobile}
          onChange={setMobile}
          label="Номер телефона"
          maxWidth="none"
        />
        <Input
          value={comment}
          onChange={setComment}
          label="Комментарии"
          maxWidth="none"
        />
        <Button className="offer__button" type="button">
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default Offer;
