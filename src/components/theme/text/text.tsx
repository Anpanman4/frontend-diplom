import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  memo,
  FC
} from 'react';
import './text.scss';

import classNames from 'classnames';
import mergeRefs from 'merge-refs';

import { AsProps, DefaultElement, Props } from '../../../utils/props-types';

type TextElement = HTMLSpanElement;

type Level = 1 | 2 | 3 | 4 | 5;
type Height = 'short' | 'normal' | 'large';
type Weight = 'regular' | 'medium' | 'bold';
type Color =
  | 'black'
  | 'gray-1'
  | 'gray-2'
  | 'gray-3'
  | 'gray-4'
  | 'gray-5'
  | 'dark-blue';

export type TextProps = Props<
  AsProps & {
    level?: Level;
    height?: Height;
    weight?: Weight;
    color?: Color;
  },
  true,
  DetailedHTMLProps<HTMLAttributes<TextElement>, TextElement>
>;

const getTextComponent = (level: Level): DefaultElement =>
  level < 5 ? <span /> : <small />;

const defaultLevel: Level = 1;
const defaultHeight: Height = 'normal';
const defaultWeight: Weight = 'regular';
const defaultColor: Color = 'black';

export const Text: FC<TextProps> = memo(
  forwardRef<TextElement, TextProps>(
    (
      {
        level = defaultLevel,
        height = defaultHeight,
        weight = defaultWeight,
        color = defaultColor,
        as: Component = getTextComponent(level),
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
          'hg-text',
          {
            [`hg-text--${level}`]: level !== defaultLevel,
            [`hg-text--${height}`]: height !== defaultHeight,
            [`hg-text--${weight}`]: weight !== defaultWeight,
            [`hg-text--${color}`]: color !== defaultColor
          },
          className,
          Component.props.className
        )}
      />
    )
  )
);
