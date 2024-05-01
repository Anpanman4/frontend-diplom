import React, { ReactNode, memo } from 'react';
import './input.scss';

import classNames from 'classnames';

import { Props } from '../../../utils/props-types';
import { Text } from '../text/text';

export type InputProps = Props<
  {
    onChange?: (value: string) => void;
    label?: string;
    icon?: ReactNode;
    onIconClick?: () => void;
    errorMessage?: string;
  },
  false,
  JSX.IntrinsicElements['input']
>;

const Input = memo<InputProps>(
  ({
    value,
    onChange,
    label,
    icon,
    onIconClick,
    placeholder,
    errorMessage,
    className,
    ...restProps
  }) => {
    return (
      <div className="input">
        {label && <label>{label}</label>}
        <input
          className={classNames('input__container', className)}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...restProps}
        />
        {!!icon && (
          <div className="input__icon" onClick={onIconClick}>
            {icon}
          </div>
        )}
        {errorMessage && <Text level={5}>{errorMessage}</Text>}
      </div>
    );
  }
);

export default Input;
