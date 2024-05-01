import React, { FC } from 'react';
import './header.scss';

import { NavLink, useNavigate } from 'react-router-dom';

import basketIcon from '../../images/basket.svg';
import logoIcon from '../../images/logo.svg';

export type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const number = 1;

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoIcon}
        alt="Логотип"
        onClick={() => navigate('/')}
      />
      <nav className="header__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Каталог
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Обучение
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Контакты
        </NavLink>
      </nav>
      <nav className="header__right-links">
        <NavLink
          to="/offer"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          <img src={basketIcon} alt="Корзина" />
          {number && <div className="header__basket">{number}</div>}
        </NavLink>
        <NavLink
          to="/private"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Личный кабинет
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
