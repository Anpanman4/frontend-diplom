import React, { FC, useEffect, useState } from 'react';

import './private.scss';
import { Navigate } from 'react-router-dom';

import api from '../../http/api';
import { UserType } from '../../http/types';
import logoutIcon from '../../images/svg/logout.svg';
import pencilIcon from '../../images/svg/pencil.svg';
import { BreadCrumbs } from '../theme/breadcrumbs/breadcrumbs';
import { Button } from '../theme/button/button';
import Input from '../theme/input/input';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type PrivateProps = {
  user: UserType | null;
  setIsDeleteModalOpen: (bool: boolean) => void;
};

const Private: FC<PrivateProps> = ({ user, setIsDeleteModalOpen }) => {
  if (!localStorage.getItem('hairgrad-JWT')) return <Navigate to="/sign-in" />;

  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const initials = userInfo.name
    .split(' ')
    .reduce((prev, curr) => (prev += curr[0]), '');

  const breadCrumbsItems = isClicked
    ? [
        { label: 'Главная', link: '/' },
        {
          label: 'Личный кабинет',
          link: '/private',
          onClick: () => setIsClicked(false)
        },
        { label: 'Настройки', link: '/private' }
      ]
    : [
        { label: 'Главная', link: '/' },
        { label: 'Личный кабинет', link: '/private' }
      ];

  const logout = () => {
    localStorage.clear();
    <Navigate to="/" replace={true} />;
    window.location.reload();
  };

  useEffect(() => {
    if (user) return setUserInfo({ name: user.firstName, email: user.email });
    api.getMe().then((data) =>
      setUserInfo({
        name: data.firstName,
        email: data.email
      })
    );
  }, [user]);

  return (
    <section className="private">
      <BreadCrumbs items={breadCrumbsItems} />
      {isClicked ? (
        <div className="private__redactor-container">
          <div className="private__header">
            <Title level={3}>Персональные данные</Title>
            <Text
              className="private__logout"
              level={4}
              onClick={() => {
                logout();
              }}
            >
              <img src={logoutIcon} /> Выйти из аккаунта
            </Text>
          </div>
          <div className="private__inputs-container">
            <Input
              className="private__input"
              value={userInfo.name}
              onChange={(value) => setUserInfo({ ...userInfo, name: value })}
              maxWidth="none"
              label="Фамилия Имя"
              icon={<img src={pencilIcon} />}
            />
            <Input
              className="private__input"
              value={userInfo.email}
              onChange={(value) => setUserInfo({ ...userInfo, email: value })}
              maxWidth="none"
              label="Почта"
              disabled={true}
            />
          </div>
          <Button
            className="private__button"
            variant="light-blue"
            onClick={() =>
              api
                .updateUserInfo({
                  firstName: userInfo.name,
                  email: userInfo.email
                })
                .then((data) =>
                  setUserInfo({ name: data.firstName, email: data.email })
                )
            }
          >
            <Text level={4}>Сохранить</Text>
          </Button>
          <div className="private__delete-container">
            <Title level={3}>Удаление аккаунта</Title>
            <Text className="private__delete-text" level={4}>
              Как только данный аккаунт будет удален, вы автоматически выйдете
              из системы и больше никогда не сможете войти в этот аккаунт
            </Text>
            <Button
              className="private__delete-button"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              <Text level={4}>Удалить аккаунт</Text>
            </Button>
          </div>
        </div>
      ) : (
        <div className="private__container">
          <div className="private__avatar">
            <Title level={2}>{initials}</Title>
          </div>
          <Text className="private__name" level={4} weight="bold">
            {userInfo.name}
          </Text>
          <Text className="private__email" level={4} color="gray-1">
            {userInfo.email}
          </Text>
          <Text
            className="private__control"
            level={4}
            color="gray-1"
            onClick={() => setIsClicked(true)}
          >
            Редактировать профиль
          </Text>
          <Text
            className="private__logout private__logout--margin"
            level={4}
            onClick={() => {
              logout();
            }}
          >
            <img src={logoutIcon} /> Выйти из аккаунта
          </Text>
        </div>
      )}
    </section>
  );
};

export default Private;
