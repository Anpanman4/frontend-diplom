import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../../http/api';
import Input from '../../theme/input/input';
import Sign from '../sign';

const SignIn = () => {
  const navigation = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  return (
    <Sign
      title="Вход"
      buttonTitle="Войти"
      isButtonDisabled={false}
      onButtonClick={() => {
        if (!emailInput) setEmailError('Введите почту');
        if (!passwordInput) setPasswordError('Введите пароль');
        if (!emailInput || !passwordInput) return;
        api
          .login({
            email: emailInput,
            password: passwordInput
          })
          .then((data) => data.status === 200 && navigation('/'))
          .catch((err) => {
            if (
              err.response.data.validation.body.message ===
              '"email" must be a valid email'
            )
              return setEmailError('Введена неправильная почта');
          });
      }}
      footerInfo={{
        question: 'Нет аккаунта?',
        link: '/sign-up',
        linkText: 'Зарегистрироваться'
      }}
    >
      <Input
        value={emailInput}
        onChange={(string) => {
          if (emailError) setEmailError('');
          setEmailInput(string);
        }}
        label="Электронная почта"
        maxWidth="none"
        errorMessage={emailError}
      />
      <Input
        value={passwordInput}
        onChange={(string) => {
          if (passwordError) setPasswordError('');
          setPasswordInput(string);
        }}
        type="password"
        label="Пароль"
        maxWidth="none"
        errorMessage={passwordError}
      />
    </Sign>
  );
};

export default SignIn;
