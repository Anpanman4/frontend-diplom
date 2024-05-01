import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  memo,
  FC
} from 'react';
import './title.scss';

import classNames from 'classnames';
import mergeRefs from 'merge-refs';

import { AsProps, DefaultElement, Props } from '../../../utils/props-types';

type TitleElement = HTMLHeadingElement;
type TitleElementProps = DetailedHTMLProps<
  HTMLAttributes<TitleElement>,
  TitleElement
>;

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Height = 'normal' | 'short';

export type TitleProps = Props<
  AsProps & {
    level?: Level;
    height?: Height;
  },
  true,
  TitleElementProps
>;

const headingLevels: {
  [level in Level]: DefaultElement;
} = {
  1: <h1 />,
  2: <h2 />,
  3: <h3 />,
  4: <h4 />,
  5: <h5 />,
  6: <h6 />
};

const defaultLevel: Level = 3;
const defaultHeight: Height = 'normal';

export const Title: FC<TitleProps> = memo(
  forwardRef<TitleElement, TitleProps>(
    (
      {
        level = defaultLevel,
        height = defaultHeight,
        as: Component = headingLevels[level],
        className,
        ...restProps
      },
      ref
    ) => (
      <Component.type
        ref={mergeRefs(Component.ref, ref)}
        {...restProps}
        {...Component.props}
        className={classNames(
          'hg-title',
          {
            [`hg-title--${level}`]: level !== defaultLevel,
            [`hg-title--${height}`]: height !== defaultHeight
          },
          className,
          Component.props.className
        )}
      />
    )
  )
);
