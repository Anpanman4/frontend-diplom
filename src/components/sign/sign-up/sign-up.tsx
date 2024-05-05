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
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Sign
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      isButtonDisabled={
        !emailInput || !passwordInput || !firstNameInput || !isChecked
      }
      onButtonClick={() =>
        api
          .registration({
            email: emailInput,
            password: passwordInput,
            firstName: firstNameInput
          })
          .then((data) => data.status === 200 && navigation('/'))
          .catch((err) => console.log(err.response.data.message))
      }
      footerInfo={{
        question: 'Уже есть аккаунт?',
        link: '/sign-in',
        linkText: 'Войти'
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
      <Input
        value={firstNameInput}
        onChange={setFirstNameInput}
        label="Имя"
        maxWidth="none"
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
