import React from 'react';
import { Typography } from '@material-ui/core';

export const Blockquote = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Typography
      component="blockquote"
      style={{
        margin: '20px 0',
        paddingLeft: '1.5rem',
        borderLeft: '5px solid #ee6e73',
      }}
      ref={ref}
      {...props}
    >
      {children}
    </Typography>
  );
});
