import React, { ReactNode, memo, useState } from 'react';
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
    maxWidth?: string;
  },
  false,
  Omit<JSX.IntrinsicElements['input'], 'onChange'>
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
    maxWidth,
    className,
    ...restProps
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="input" style={{ maxWidth: `${maxWidth}` }}>
        {label && (
          <label
            className={classNames('input__label', {
              ['input__label--big-text']: !value
            })}
          >
            {label}
          </label>
        )}
        <input
          className={classNames('input__container', {
            ['input__container--label-text']: label,
            ['input__container--label']: label && value,
            ['input__container--focus']: isFocused,
            ['input__container--error']: errorMessage,
            className
          })}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...restProps}
        />
        {!!icon && (
          <div
            className={classNames('input__icon', {
              ['input__icon--label']: label
            })}
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
        {errorMessage && (
          <Text className="input__error-message" level={4}>
            {errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

export default Input;
