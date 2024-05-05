import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../../http/api';
import Input from '../../theme/input/input';
import Sign from '../sign';

const SignIn = () => {
  const navigation = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <Sign
      title="Вход"
      buttonTitle="Войти"
      isButtonDisabled={!emailInput || !passwordInput}
      onButtonClick={() =>
        api
          .login({
            email: emailInput,
            password: passwordInput
          })
          .then((data) => data.status === 200 && navigation('/'))
          .catch((err) => console.log(err.response.data.message))
      }
      footerInfo={{
        question: 'Нет аккаунта?',
        link: '/sign-up',
        linkText: 'Зарегистрироваться'
      }}
    >
      <Input
        value={emailInput}
        onChange={setEmailInput}
        label="Электронная почта"
        maxWidth="none"
      />
      <Input
        value={passwordInput}
        onChange={setPasswordInput}
        label="Пароль"
        maxWidth="none"
      />
    </Sign>
  );
};

export default SignIn;
