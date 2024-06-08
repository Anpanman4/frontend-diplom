import React, { FC, useState } from 'react';
import './education.scss';

import education1 from '../../images/education1.png';
import education2 from '../../images/education2.png';
import education3 from '../../images/education3.png';
import Offer from '../catalog/offer/offer';
import { Option } from '../main/option/option';
import { BreadCrumbs } from '../theme/breadcrumbs/breadcrumbs';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type EducationProps = {};

const Education: FC<EducationProps> = () => {
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
    <section className="education">
      <BreadCrumbs
        items={[
          { label: 'Главная', link: '/' },
          { label: 'Обучение', link: '/education' }
        ]}
      />
      <div className="education__system">
        <Title className="education__system-title" level={1}>
          HairGrad System
        </Title>
        <Text className="education__system-text" level={2}>
          — это полный обучающий курс для сети салонов и мужских парикмахерских
        </Text>
      </div>
      <div className="education__header">
        <Title className="education__header-title" level={4}>
          Авторский курс состоит из трех блоков
        </Title>
        <div className="education__items">
          {['Форма', 'Содержание', 'Направление'].map((title, index) => (
            <Option key={index} title={title} width="303px" />
          ))}
        </div>
      </div>
      <div className="education__infos">
        <div className="education__infos-container">
          <img src={education1} alt="" />
          <div className="education__text-container">
            <Title level={2}>Форма</Title>
            <Text className="education__text-info" level={4} color="gray-2">
              Теория и отработка основных принципов A.B.C Vidal Sassoon на
              болванках.
            </Text>
            <Text className="education__description-info" level={3}>
              Это базовые универсальные знания, без которых возможности мастера,
              как профессионала, будут ограничены. A.B.C — это дисциплина,
              которая даст правильный вектор для развития профессиональных
              качеств в мастере.
            </Text>
            <Title className="education__botton-title" level={3}>
              Изучаем
            </Title>
            <Text
              className="education__description-info education__description-info--bottom"
              level={3}
            >
              – свойства форм и их взаимодействия
              <br />– биомеханику тела, которая является инструментом для
              выражения техники
              <br />– образное мышление для вариативности выбранного метода
            </Text>
          </div>
        </div>
        <div className="education__infos-container">
          <div className="education__text-container">
            <Title level={2}>Содержание</Title>
            <Text className="education__text-info" level={4} color="gray-2">
              Теория и отработка на моделях
            </Text>
            <Text className="education__description-info" level={3}>
              Этот блок учит анализировать натуру, выявлять потребности и
              принципы движения волосяного покрова, доводить форму до
              абстрактной, а затем применять самыми разнообразными способами,
              превращая творчество в увлекательную игру, – то есть учит тому,
              что называется дизайнерским мышлением.
            </Text>
          </div>
          <img src={education2} alt="" />
        </div>
        <div className="education__infos-container">
          <img src={education3} alt="" />
          <div className="education__text-container">
            <Title level={2}>Направление</Title>
            <Text className="education__text-info" level={4} color="gray-2">
              Практика через опыт фотосессии
            </Text>
            <Text className="education__description-info" level={3}>
              На этом этапе мастер учится искусству завершения, грамотно
              выстраивая из структуры и смыслов композицию.
            </Text>
            <Title className="education__botton-title" level={3}>
              В процессе обучения
            </Title>
            <Text
              className="education__description-info education__description-info--bottom"
              level={3}
            >
              мы будем создавать Look book. Это необходимо для распаковки
              индивидуальных качеств мастера и формирования командного мышления.
              Внедрение фотосессии в обучающий процесс активирует у мастеров
              эстетический интеллект и желание творить
            </Text>
          </div>
        </div>
      </div>
      <div className="education__intro">
        <div className="education__intro-container">
          <Title level={3}>Обучение прокачивает</Title>
          <Text level={3} height="large">
            – интуитивный ритм
            <br />
            – работу с балансом в укладке
            <br />– работу со стайлингом и текстурой
          </Text>
        </div>
        <div className="education__intro-container">
          <Text level={3} height="large">
            Укладка волос — это ключевой момент в завершении образа и услуги,
            где соединяется клиент, мастер и салон.
          </Text>
        </div>
      </div>
      <Offer
        title="Заявка на обучение"
        about={[
          'Присоединяйтесь к комьюнити HairGrad!',
          'Оставьте свои контактные данные и мы предложим вам персональные акции.'
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
          if (!inputsData.name || !inputsData.mobile)
            return setInputsError({
              ...inputsError,
              name: inputsData.name ? '' : 'Заполните имя',
              mobile: inputsData.mobile ? '' : 'Заполните номер телефона'
            });
          e.preventDefault();
          const data = new FormData();
          data.append('name', inputsData.name);
          data.append('mobile', inputsData.mobile);
          data.append('comment', inputsData.comment);
          try {
            await fetch(
              'https://script.google.com/macros/s/AKfycbyQXvF3QoyQGbtl3fH_gFFa0i_s-z29PRCy2ARJIP24-1SNjahMsuD69CQBY86FBSHBBg/exec',
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

export default Education;
