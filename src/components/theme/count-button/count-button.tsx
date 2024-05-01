import React, { memo } from 'react';
import './count-button.scss';

export type CountButtonProps = {
  isMinus: boolean;
  onClick?: () => void;
};

export const CountButton = memo<CountButtonProps>(({ isMinus, onClick }) => {
  return (
    <button className="count-button" type="button" onClick={onClick}>
      {isMinus ? '-' : '+'}
    </button>
  );
});
