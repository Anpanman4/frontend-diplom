import React, { FC } from 'react';
import './footer.scss';

import { NavLink, useNavigate } from 'react-router-dom';

import logoIcon from '../../images/svg/logo.svg';
import tgIcon from '../../images/svg/tg.svg';
import vkIcon from '../../images/svg/vk.svg';
import { Title } from '../theme/title/title';

export type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer__container">
        <img
          className="footer__logo"
          src={logoIcon}
          alt="Логотип"
          onClick={() => navigate('/')}
        />
        <nav className="footer__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `footer__link ${isActive ? 'footer__link--active' : ''}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `footer__link ${isActive ? 'footer__link--active' : ''}`
            }
          >
            Косметика
          </NavLink>
          <NavLink
            to="/education"
            className={({ isActive }) =>
              `footer__link ${isActive ? 'footer__link--active' : ''}`
            }
          >
            Обучение
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `footer__link ${isActive ? 'footer__link--active' : ''}`
            }
          >
            Контакты
          </NavLink>
        </nav>
        <address className="footer__contacts">
          <Title level={5}>+7 (495)-374-43-49</Title>
          <Title level={5}>hairgrad@mail.ru</Title>
        </address>
        <nav className="footer__socials">
          <a className="footer__social" href="#">
            <img src={tgIcon} alt="tg" />
          </a>
          <a className="footer__social" href="#">
            <img src={vkIcon} alt="vk" />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
