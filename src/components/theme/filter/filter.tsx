import React, { memo } from 'react';
import './filter.scss';

import filterIcon from '../../../images/svg/filter.svg';
import { Text } from '../text/text';

export type FilterProps = { onChange?: () => void };

export const Filter = memo<FilterProps>(({ onChange }) => {
  return (
    <div className="filter">
      <img loading="lazy" src={filterIcon} alt="" />
      <Text level={4}>Фильтровать</Text>
    </div>
  );
});
