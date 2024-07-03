import React, { memo } from 'react';
import './button.scss';

import classNames from 'classnames';

import { Props } from '../../../utils/props-types';

type variant = 'default' | 'light-blue' | 'red';

const defaultVariant: variant = 'default';

export type ButtonProps = Props<
  { variant?: variant },
  true,
  Omit<JSX.IntrinsicElements['button'], 'size'>
>;

export const Button = memo<ButtonProps>(
  ({
    variant = defaultVariant,
    onClick,
    disabled,
    children,
    className,
    ...restProps
  }) => {
    return (
      <button
        className={classNames(
          'hg-button',
          {
            [`hg-button--${variant}`]: variant !== defaultVariant,
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
