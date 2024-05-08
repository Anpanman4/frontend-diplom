import React, { memo } from 'react';
import './option.scss';

import { Text } from '../../theme/text/text';

type OptionType = {
  title: string;
  color?: string;
  width: string;
};

export const Option = memo<OptionType>(({ title, color, width }) => {
  return (
    <div className="hg-option" style={{ width }}>
      <Text level={2}>{title}</Text>
      <div
        className={`hg-option__circle ${color ? '' : 'hg-option__circle--border'}`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
});
