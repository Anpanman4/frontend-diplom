import React, { FC, useState } from 'react';
import './contacts.scss';

import TGIcon from '../../images/svg/tgBig.svg';
import VKIcon from '../../images/svg/vkBig.svg';
import Offer from '../catalog/offer/offer';
import { BreadCrumbs } from '../theme/breadcrumbs/breadcrumbs';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type ContactsProps = {};

const Contacts: FC<ContactsProps> = () => {
  const [inputsData, setInputsData] = useState({
    name: '',
    mobile: '',
    comment: ''
  });
  const [inputsError, setInputsError] = useState({
    name: '',
    mobile: '',
    comment: ''
  });

  return (
    <section className="contacts">
      <BreadCrumbs
        items={[
          { label: 'Главная', link: '/' },
          { label: 'Контакты', link: '/contacts' }
        ]}
      />
      <Title className="contacts__title" level={1}>
        Контакты
      </Title>
      <div className="contacts__container">
        <div className="contacts__info">
          <Text level={3} color="gray-1">
            Связаться по вопросам сотрудничества:
          </Text>
          <div className="contacts__texts">
            <Title level={3} color="dark-blue">
              +7 (495)-374-43-49
            </Title>
            <Title level={3} color="dark-blue">
              hairgrad@mail.com
            </Title>
          </div>
        </div>
        <div className="contacts__info">
          <Text level={3} color="gray-1">
            Присоединяйтесь к нашему комьюнити в соц. сетях!
          </Text>
          <div className="contacts__imgs">
            <img src={TGIcon} alt="" />
            <img src={VKIcon} alt="" />
          </div>
        </div>
      </div>
      <Offer
        title="Сотрудничество"
        about={[
          'Присоединяйтесь к комьюнити HairGrad!',
          'Оставьте свои контактные данные и мы предложим вам персональные акции для оптового заказа.'
        ]}
        inputs={[
          {
            value: inputsData.name,
            setValue: (value) => {
              if (inputsError.name)
                setInputsError({ ...inputsError, name: '' });
              setInputsData({ ...inputsData, name: value });
            },
            label: 'ФИО или Название организации',
            errorMessage: inputsError.name
          },
          {
            value: inputsData.mobile,
            setValue: (value) => {
              if (inputsError.mobile)
                setInputsError({ ...inputsError, mobile: '' });
              setInputsData({ ...inputsData, mobile: value });
            },
            label: 'Номер телефона',
            errorMessage: inputsError.mobile
          },
          {
            value: inputsData.comment,
            setValue: (value) =>
              setInputsData({ ...inputsData, comment: value }),
            label: 'Комментарии'
          }
        ]}
        onClick={async (e) => {
          if (!inputsData.name)
            setInputsError({ ...inputsError, name: 'Заполните имя' });
          if (!inputsData.mobile)
            setInputsError({
              ...inputsError,
              mobile: 'Заполните номер телефона'
            });
          if (!inputsData.name || !inputsData.mobile) return '';
          e.preventDefault();
          const data = new FormData();
          data.append('name', inputsData.name);
          data.append('mobile', inputsData.mobile);
          data.append('comment', inputsData.comment);
          try {
            await fetch(
              'https://script.google.com/macros/s/AKfycbydoep_DiyKJh38Z064uXTuC47wFw6S1KIdK1ndM6Hvq30fTGyl0uQ4nM5EEngkzbv3/exec',
              {
                method: 'POST',
                body: data
              }
            );
            setInputsData({
              name: '',
              mobile: '',
              comment: ''
            });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </section>
  );
};

export default Contacts;
