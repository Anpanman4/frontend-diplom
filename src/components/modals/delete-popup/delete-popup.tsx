import React from 'react';

import './delete-popup.scss';
import { Button } from '../../theme/button/button';
import { Modal } from '../../theme/modal/modal';
import { Text } from '../../theme/text/text';
import { Title } from '../../theme/title/title';

export type DeletePopupProps = {
  visible: boolean;
  onClose: () => void;
};

export const DeletePopup = ({ visible, onClose }: DeletePopupProps) => {
  return (
    <Modal className="hg-delete-popup" visible={visible} onClose={onClose}>
      <Title level={3}>Удаление аккаунта</Title>
      <Text className="hg-delete-popup__text" level={4}>
        Вы уверены, что хотите удалить свой аккаунт? Если вы удалите свой
        аккаунт, все ваши данные будут удалены и больше никогда не сможете войти
        в этот аккаунт
      </Text>
      <div className="hg-delete-popup__controls">
        <Button variant="red">Удалить аккаунта</Button>
        <Button onClick={onClose}>Отмена</Button>
      </div>
    </Modal>
  );
};
