import React from 'react';
import { Typography } from '@material-ui/core';
import { Blockquote } from '../intflaskTypography';

export const BLOCK_QUOTE = 'block-quote';
export const NUMBERED_LIST = 'numbered-list';
export const BULLETED_LIST = 'bulleted-list';
export const LIST_ITEM = 'list-item';
export const HEADING_ONE = 'heading-one';
export const HEADING_TWO = 'heading-two';
export const HEADING_THREE = 'heading-three';
export const HEADING_FOUR = 'heading-four';
export const HEADING_FIVE = 'heading-five';
export const HEADING_SIX = 'heading-six';
export const DEFAULT = 'paragraph';
const LIST_TYPES = [NUMBERED_LIST, BULLETED_LIST];

export function isListType(type) {
  LIST_TYPES.includes(type);
}

export default function Element({ attributes, children, element }) {
  switch (element.type) {
    case BLOCK_QUOTE:
      return <Blockquote {...attributes}>{children}</Blockquote>;
    case NUMBERED_LIST:
      return <ol {...attributes}>{children}</ol>;
    case BULLETED_LIST:
      return <ul {...attributes}>{children}</ul>;
    case LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case HEADING_ONE:
      return (
        <Typography component="h1" {...attributes}>
          {children}
        </Typography>
      );
    case HEADING_TWO:
      return (
        <Typography component="h2" {...attributes}>
          {children}
        </Typography>
      );
    case HEADING_THREE:
      return (
        <Typography component="h3" {...attributes}>
          {children}
        </Typography>
      );
    case HEADING_FOUR:
      return (
        <Typography component="h4" {...attributes}>
          {children}
        </Typography>
      );
    case HEADING_FIVE:
      return (
        <Typography component="h5" {...attributes}>
          {children}
        </Typography>
      );
    case HEADING_SIX:
      return (
        <Typography component="h6" {...attributes}>
          {children}
        </Typography>
      );
    case DEFAULT:
    default:
      return (
        <Typography component="p" {...attributes}>
          {children}
        </Typography>
      );
  }
}
