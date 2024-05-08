import React from 'react';
import './checkbox.scss';

import classNames from 'classnames';

import checkboxIcon from '../../../images/svg/checkbox.svg';
import { component } from '../../../utils/component';
import { Props } from '../../../utils/props-types';
import { Text } from '../text/text';

export type CheckBoxProps = Props<
  {
    checked?: boolean;
    onChange?: () => void;
    label?: string;
    className?: string;
  },
  false,
  Omit<
    JSX.IntrinsicElements['input'],
    'type' | 'checked' | 'className' | 'onChange'
  >
>;

export const CheckBox = component<CheckBoxProps, HTMLDivElement>(
  ({ checked = false, onChange, label, className, ...restProps }, ref) => {
    return (
      <div className="hg-checkbox">
        <div
          className={classNames(
            'hg-checkbox__container',
            { 'hg-checkbox__container--checked': checked },
            className
          )}
          ref={ref}
          onClick={(event) => {
            event.preventDefault();
            onChange?.();
          }}
        >
          <img
            src={checkboxIcon}
            alt=""
            className={classNames('hg-checkbox__check-icon', {
              'hg-checkbox__check-icon--checked': checked
            })}
          />
          <input
            className="hg-checkbox__input"
            type="checkbox"
            checked={checked}
            onChange={() => ''}
            {...restProps}
          />
        </div>
        <Text level={4} color="gray-2">
          {label}
        </Text>
      </div>
    );
  }
);
