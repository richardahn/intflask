import React from 'react';
import ReactProgressiveImage from 'react-progressive-image';

export default function ProgressiveImage({ src, placeholderSrc, ...props }) {
  return (
    <ReactProgressiveImage src={src} placeholder={placeholderSrc}>
      {(src, loading) => (
        <img
          style={{
            opacity: loading ? 0.5 : 1,
            filter: loading ? 'blur(10px)' : 'none',
            transition: 'opacity ease-in 70ms',
            WebkitTransition: '-webkit-filter 140ms ease-in',
          }}
          alt="progressive"
          src={src}
          {...props}
        />
      )}
    </ReactProgressiveImage>
  );
}
