import React, { FC, ReactNode } from 'react';
import './sign.scss';

import { Link } from 'react-router-dom';

import { Button } from '../theme/button/button';
import { Title } from '../theme/title/title';

export type SignProps = {
  title: string;
  buttonTitle: string;
  isButtonDisabled: boolean;
  onButtonClick: () => void;
  footerInfo: {
    question: string;
    linkText: string;
    link: string;
  };
  children?: ReactNode;
};

const Sign: FC<SignProps> = ({
  title,
  buttonTitle,
  isButtonDisabled,
  onButtonClick,
  footerInfo,
  children
}) => {
  return (
    <section className="sign">
      <form className="sign__container">
        <Title level={1}>{title}</Title>
        <div className="sign__input-container">{children}</div>
        <Button
          className="sign__button"
          type="button"
          onClick={() => onButtonClick()}
          disabled={isButtonDisabled}
        >
          {buttonTitle}
        </Button>
        <div className="sign__footer">
          <p className="sign__footer-text">{footerInfo.question}</p>
          <Link className="sign__footer-link" to={footerInfo.link}>
            {footerInfo.linkText}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Sign;
