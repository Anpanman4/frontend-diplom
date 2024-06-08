import React, { FC } from 'react';
import './footer.scss';

import { Link, useNavigate } from 'react-router-dom';

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
          <Link to="/" className="footer__link">
            Главная
          </Link>
          <Link to="/catalog" className="footer__link">
            Косметика
          </Link>
          <Link to="/education" className="footer__link">
            Обучение
          </Link>
          <Link to="/contacts" className="footer__link">
            Контакты
          </Link>
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
