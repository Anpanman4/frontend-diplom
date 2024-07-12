import React, { useState } from 'react';
import './general.scss';

import api from '../../../http/api';
import { CheckBox } from '../../theme/checkbox/checkbox';
import Input from '../../theme/input/input';
import { Text } from '../../theme/text/text';

const General = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <section className="general">
      <Text className="general__text" level={4}>
        Впишите почту и нажмите Enter для того, чтобы выдать пользователю права
        админа
      </Text>
      <Input
        value={inputValue}
        onChange={(value) => {
          if (successMessage) setSuccessMessage('');
          if (errorMessage) setErrorMessage('');
          setInputValue(value);
        }}
        label="Почта пользователя"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            api
              .updateUserStatus(inputValue, isAdmin)
              .then(() => setSuccessMessage('Успешно применилось'))
              .catch(() =>
                setErrorMessage('Такого пользователя не существует')
              );
          }
        }}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <CheckBox
        checked={isAdmin}
        onChange={(value) => {
          setIsAdmin(value);
        }}
        label="В активном состояние кнопки человек получит права админа"
      />
    </section>
  );
};

export default General;
