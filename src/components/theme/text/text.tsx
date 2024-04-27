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

import { AsProps, DefaultElement, Props } from 'utils/props-types';

type TextElement = HTMLSpanElement;

type Level = 1 | 2 | 3 | 4 | 5;
type Height = 'normal' | 'short';
type Weight = 'regular' | 'medium';

export type TextProps = Props<
  AsProps & {
    level?: Level;
    height?: Height;
    weight?: Weight;
  },
  true,
  DetailedHTMLProps<HTMLAttributes<TextElement>, TextElement>
>;

const getTextComponent = (level: Level): DefaultElement =>
  level < 5 ? <span /> : <small />;

const defaultLevel: Level = 1;
const defaultHeight: Height = 'normal';
const defaultWeight: Weight = 'regular';

export const Text: FC<TextProps> = memo(
  forwardRef<TextElement, TextProps>(
    (
      {
        level = defaultLevel,
        height = defaultHeight,
        weight = defaultWeight,
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
          'sf-title',
          {
            [`sf-title--${level}`]: level !== defaultLevel,
            [`sf-title--${height}`]: height !== defaultHeight,
            [`sf-title--${weight}`]: weight !== defaultWeight
          },
          className,
          Component.props.className
        )}
      />
    )
  )
);
