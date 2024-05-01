import React, { memo } from 'react';
import './button.scss';

import classNames from 'classnames';

import { Props } from '../../../utils/props-types';

export type ButtonProps = Props<
  {},
  true,
  Omit<JSX.IntrinsicElements['button'], 'size'>
>;

export const Button = memo<ButtonProps>(
  ({ onClick, disabled, children, className, ...restProps }) => {
    return (
      <button
        className={classNames(
          'hg-button',
          {
            ['hg-button--disabled']: disabled
          },
          className
        )}
        onClick={onClick}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);
