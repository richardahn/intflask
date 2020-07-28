/** @jsx jsx */
import { jsx } from '@emotion/core';

export default function FloatingActionButton({
  top = '4rem',
  right = '1.5rem',
  children,
  ...props
}) {
  return (
    <div css={{ position: 'fixed', top, right, zIndex: 2 }} {...props}>
      {children}
    </div>
  );
}
