import React from 'react';

export const BOLD = 'bold';
export const CODE = 'code';
export const ITALIC = 'italic';
export const UNDERLINE = 'underline';
export const DEFAULT = 'span';

export default function Leaf({ attributes, children, leaf }) {
  if (leaf[BOLD]) {
    children = <strong>{children}</strong>;
  }
  if (leaf[CODE]) {
    children = <code>{children}</code>;
  }
  if (leaf[ITALIC]) {
    children = <em>{children}</em>;
  }
  if (leaf[UNDERLINE]) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}
