import React, { memo } from 'react';
import './count-button.scss';

import classNames from 'classnames';

type Size = 'medium' | 'small';

export type CountButtonProps = {
  isMinus: boolean;
  onClick?: () => void;
  size?: Size;
};

const defaultSize: Size = 'medium';

export const CountButton = memo<CountButtonProps>(
  ({ isMinus, onClick, size = defaultSize }) => {
    return (
      <button
        className={classNames('count-button', {
          [`count-button--${size}`]: defaultSize !== size
        })}
        type="button"
        onClick={onClick}
      >
        {isMinus ? '-' : '+'}
      </button>
    );
  }
);
