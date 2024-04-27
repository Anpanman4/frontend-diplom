import {
  CSSProperties,
  PropsWithChildren,
  PropsWithRef,
  ReactElement,
  ReactText,
  RefObject,
  SVGProps
} from 'react';

export type IdProps = {
  id?: string;
};

export type ClassNameProps = {
  className?: string;
};

export type StyleProps = {
  style?: CSSProperties;
};

export type DefaultProps = ClassNameProps & StyleProps & IdProps;

export type WithChildren<Props = {}> = PropsWithChildren<Props>;

export type Props<
  Props = {},
  Children = true,
  HtmlElementProps = unknown
> = PropsWithRef<
  Children extends false
    ? Omit<HtmlElementProps & DefaultProps & Props, 'children'>
    : Children extends true
      ? WithChildren<HtmlElementProps & DefaultProps & Props>
      : { children: Children } & HtmlElementProps & DefaultProps & Props
>;

export type DefaultElement<P = Props, Ref = unknown> = ReactElement<P> & {
  ref?: RefObject<Ref>;
};

export type AsProps<P = Props> = {
  as?: DefaultElement<P>;
};

export type Content<P = Props> = DefaultElement<P> | ReactText;

export type Icon = ReactElement<SVGProps<SVGSVGElement>> & {
  ref?: RefObject<SVGProps<SVGSVGElement>>;
};
