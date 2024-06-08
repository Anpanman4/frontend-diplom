import React, { FC } from 'react';
import './offer.scss';

import { Button } from '../../theme/button/button';
import Input from '../../theme/input/input';
import { Text } from '../../theme/text/text';
import { Title } from '../../theme/title/title';

export type OfferType = {
  title: string;
  about: string[];
  inputs: {
    value: string;
    setValue: (value: string) => void;
    label: string;
    errorMessage?: string;
  }[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Offer: FC<OfferType> = ({ title, about, inputs, onClick }) => {
  return (
    <div className="offer">
      <div className="offer__info">
        <Title level={1}>{title}</Title>
        <Text className="offer__description" level={4}>
          {about[0]}
          <br />
          {about[1]}
        </Text>
      </div>
      <form className="offer__form">
        {inputs.map((inputData, index) => (
          <Input
            key={index}
            value={inputData.value}
            onChange={inputData.setValue}
            label={inputData.label}
            maxWidth="none"
            errorMessage={inputData.errorMessage}
          />
        ))}
        <Button className="offer__button" type="button" onClick={onClick}>
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default Offer;
