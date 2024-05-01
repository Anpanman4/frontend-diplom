import React, { FC } from 'react';
import './header.scss';

import { NavLink, useNavigate } from 'react-router-dom';

import basketIcon from '../../images/svg/basket.svg';
import logoIcon from '../../images/svg/logo.svg';

export type HeaderProps = { basketCount?: number };

const Header: FC<HeaderProps> = ({ basketCount }) => {
  const navigate = useNavigate();

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
          Косметика
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
            `header__basket ${isActive ? 'header__basket--active' : ''}`
          }
        >
          <img src={basketIcon} alt="Корзина" />
          {basketCount && (
            <div className="header__basket-text">
              {basketCount <= 9 ? basketCount : '9+'}
            </div>
          )}
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
