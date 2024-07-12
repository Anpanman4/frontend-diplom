import React from 'react';
import './switcher.scss';

import classNames from 'classnames';

import { component } from '../../../utils/component';
import { Props } from '../../../utils/props-types';

export type SwitcherProps = Props<
  {
    checked?: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
  },
  false,
  Omit<
    JSX.IntrinsicElements['input'],
    'type' | 'checked' | 'className' | 'onChange'
  >
>;

export const Switcher = component<SwitcherProps, HTMLDivElement>(
  ({ checked = false, onChange, className, ...restProps }, ref) => {
    return (
      <div
        className={classNames('hg-switcher', className)}
        ref={ref}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onChange?.(!checked);
        }}
        {...restProps}
      >
        <input
          className="hg-switcher__input"
          checked={checked}
          onChange={() => ''}
          type="checkbox"
        />
        <span
          className={classNames('hg-switcher__slider', {
            'hg-switcher__slider--active': checked
          })}
        ></span>
      </div>
    );
  }
);
