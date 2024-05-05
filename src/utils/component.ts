import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  PropsWithRef
} from 'react';

export const component = <Props, Ref>(
  render: ForwardRefRenderFunction<Ref, Props>
) => memo(forwardRef(render)) as unknown as FC<PropsWithRef<Props>>;
