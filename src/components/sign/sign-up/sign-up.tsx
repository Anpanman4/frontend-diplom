import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../../http/api';
import { CheckBox } from '../../theme/checkbox/checkbox';
import Input from '../../theme/input/input';
import Sign from '../sign';

const SignUp = () => {
  const navigation = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstNameInput, setFirstNameInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Sign
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      isButtonDisabled={false}
      onButtonClick={() => {
        console.log(emailInput, firstNameError);
        if (!emailInput) setEmailError('Введите почту');
        if (!passwordInput) setPasswordError('Введите пароль');
        if (!firstNameInput) setFirstNameError('Введите имя');
        if (!emailInput || !passwordInput || !firstNameInput) return;
        api
          .registration({
            email: emailInput,
            password: passwordInput,
            firstName: firstNameInput
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
        question: 'Уже есть аккаунт?',
        link: '/sign-in',
        linkText: 'Войти'
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
      <Input
        value={firstNameInput}
        onChange={(string) => {
          if (firstNameError) setFirstNameError('');
          setFirstNameInput(string);
        }}
        label="Имя"
        maxWidth="none"
        errorMessage={firstNameError}
      />
      <CheckBox
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        label="Согласен на обработку персональных данных"
      />
    </Sign>
  );
};

export default SignUp;
