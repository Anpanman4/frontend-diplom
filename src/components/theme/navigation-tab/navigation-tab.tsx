import React, { FC, ReactNode, useState } from 'react';
import './navigation-tab.scss';

import classNames from 'classnames';

import { Text } from '../text/text';

export type NavigationTabProps = {
  items: { label: string; body: string | ReactNode }[];
  className?: string;
};

export const NavigationTab: FC<NavigationTabProps> = ({ items, className }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={classNames('navigation-tab', className)}>
      <nav className="navigation-tab__controls">
        {items.map((value, index) => (
          <Text
            key={value.label}
            className={classNames('navigation-tab__control', {
              'navigation-tab__control--active': index === currentTab
            })}
            level={4}
            color="gray-1"
            onClick={() => setCurrentTab(index)}
          >
            {value.label}
          </Text>
        ))}
      </nav>
      {items[currentTab].body}
    </div>
  );
};
