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
type Color = 'black' | 'dark-blue';

export type TitleProps = Props<
  AsProps & {
    level?: Level;
    height?: Height;
    color?: Color;
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
const defaultColor: Color = 'black';

export const Title: FC<TitleProps> = memo(
  forwardRef<TitleElement, TitleProps>(
    (
      {
        level = defaultLevel,
        height = defaultHeight,
        color = defaultColor,
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
            [`hg-title--${height}`]: height !== defaultHeight,
            [`hg-title--${color}`]: color !== defaultColor
          },
          className,
          Component.props.className
        )}
      />
    )
  )
);
